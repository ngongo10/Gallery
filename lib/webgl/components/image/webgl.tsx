import { useTexture } from '@react-three/drei'
import type { Rect } from 'hamo'
import { useEffect, useRef, useState } from 'react'
import { LinearFilter, type Mesh, ShaderMaterial, Vector2 } from 'three'
import { useWebGLRect } from '@/webgl/hooks/use-webgl-rect'
import gsap from 'gsap'

type WebGLImageProps = {
  src: string | undefined
  rect: Rect
  /** Whether the element is visible in the viewport */
  visible?: boolean
}

type WebGLImageMeshProps = {
  src: string
  rect: Rect
  /** Whether the element is visible in the viewport */
  visible?: boolean
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform sampler2D tMap;
  uniform vec2 uOffset;
  uniform float uAlpha;
  varying vec2 vUv;

  void main() {
    // Chromatic aberration (RGB split) sampling
    float r = texture2D(tMap, vUv + uOffset).r;
    float g = texture2D(tMap, vUv).g;
    float b = texture2D(tMap, vUv - uOffset).b;
    
    gl_FragColor = vec4(r, g, b, uAlpha);
  }
`

function isRectValid(rect: Rect): boolean {
  return (
    rect.width !== undefined &&
    rect.height !== undefined &&
    rect.top !== undefined &&
    rect.left !== undefined
  )
}

export function WebGLImage({ src, rect, visible = true }: WebGLImageProps) {
  if (!src) return null

  return <WebGLImageMesh src={src} rect={rect} visible={visible} />
}

function WebGLImageMesh({ src, rect, visible = true }: WebGLImageMeshProps) {
  const meshRef = useRef<Mesh>(null!)
  
  // Custom RGB split shader material
  const [material] = useState(() => new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      tMap: { value: null },
      uOffset: { value: new Vector2(0, 0) },
      uAlpha: { value: 1.0 }
    },
    transparent: true
  }))

  // Mount effect owns the material it creates — dispose it on unmount.
  useEffect(() => {
    return () => {
      material.dispose()
    }
  }, [material])

  // Trigger RGB Split glitch transition when image source changes
  useEffect(() => {
    if (!material) return

    // Offset uniforms to trigger chromatic aberration
    material.uniforms.uOffset!.value.set(0.015, 0.01)

    // Smoothly animate the offset back to 0 (normal)
    gsap.to(material.uniforms.uOffset!.value, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'power2.out'
    })
  }, [src, material])

  // Reset material map on source change or unmount
  // biome-ignore lint/correctness/useExhaustiveDependencies(src): src dependency is intended to reset map references
  useEffect(() => {
    return () => {
      material.uniforms.tMap!.value = null
    }
  }, [material, src])

  useTexture(src, (texture) => {
    texture.magFilter = texture.minFilter = LinearFilter
    texture.generateMipmaps = false

    material.uniforms.tMap!.value = texture
    material.needsUpdate = true
  })

  // Check if rect is valid (has been measured)
  const rectIsValid = isRectValid(rect)

  // Pass visibility to skip computations when off-screen
  useWebGLRect(
    rect,
    ({
      position,
      scale,
    }: {
      position: { x: number; y: number; z: number }
      scale: { x: number; y: number; z: number }
    }) => {
      meshRef.current.position.set(position.x, position.y, position.z)
      meshRef.current.scale.set(scale.x, scale.y, scale.z)
      meshRef.current.updateMatrix()
    },
    { visible: visible && rectIsValid }
  )

  // Don't render until rect is measured
  if (!rectIsValid) return null

  return (
    <mesh ref={meshRef} matrixAutoUpdate={false}>
      <planeGeometry />
      <primitive object={material} />
    </mesh>
  )
}
