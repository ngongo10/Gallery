export interface Photo {
  originalSrc?: string;
  src: string;
  placeholder: string;
  aspectRatio: number;
  shotNumber?: string;
  shotType?: string;
  description?: string;
  hasEmbeddedSidebar?: boolean;
}

export interface Series {
  id: string;
  title: string;
  year: string;
  essay: string;
  images: Photo[];
}

export interface PrintProduct {
  id: string;
  title: string;
  year: string;
  type: string;
  paper: string;
  price: number;
  image: string;
  placeholder: string;
  sizes: string[];
  inStock: boolean;
}

export interface PortfolioData {
  series: Series[];
  shop: PrintProduct[];
  about: {
    bioParagraphs: string[];
    email: string;
    instagram: string;
    cvUrl: string;
    sideProjects: { title: string; url: string }[];
  };
}

export const portfolioData: PortfolioData = {
  "series": [
    {
      "id": "Graduation Photography",
      "title": "GRADUATION PHOTOGRAPHY",
      "year": "2026",
      "essay": "Series photography collection: Graduation Photography",
      "images": [
        {
          "src": "/images/Graduation%20Photography/1108237420833724861.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/Graduation%20Photography/1108237420833724863.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/Graduation%20Photography/1108237420833724868.png",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/Graduation%20Photography/1108237420833724875.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/Graduation%20Photography/1108237420833724981.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/Graduation%20Photography/1108237420833724993.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/Graduation%20Photography/1108237420833725004_%F0%9D%91%86%F0%9D%90%B4%F0%9D%91%89%F0%9D%90%B8%20%3D%20%F0%9D%90%B9%F0%9D%90%BF%F0%9D%91%82%F0%9D%91%8A%20%F0%9D%91%80%F0%9D%90%B8_%40%F0%9D%92%89%F0%9D%92%90%F0%9D%92%82%F0%9D%92%8F%F0%9D%92%88%F0%9D%92%95%F0%9D%92%89%F0%9D%92%8A%F0%9D%92%92%F0%9D%92%96%F0%9D%92%9A%F0%9D%92%86%F0%9D%92%8F266.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/Graduation%20Photography/1108237420833725015.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/Graduation%20Photography/1108237420833725056.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/Graduation%20Photography/1108237420833725109.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/Graduation%20Photography/1108237420833725186.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/Graduation%20Photography/1108237420833725188.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        }
      ]
    },
    {
      "id": "grass",
      "title": "GRASS",
      "year": "2026",
      "essay": "Series photography collection: grass",
      "images": [
        {
          "src": "/images/grass/0505276dcaa53a08facc7774d01224f7.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/0521e357d66b2383561c0675d5e39831.png",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/0742c8a7a057634bf6e15c3f920ece9b.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/0fb42351c4ddf68288e31b205d3661ef.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/0ff1699a8f2d4b4298150e87f8abbe6f.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/1560ffb7fb7c892fe2e556bb14dcfcc9.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/17b910e23b73b5e9608dbbb08585ed46.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/1e6a901307699ad320f51c23476caa8f.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/1f3ca4b3733096e73496f6ba6df06665.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/223ddb17a4716a361675880cb406286a.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/2a5e64e87aa8f5acba8e9f6733b3f9df.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/2eebdd95fad3c95e2378ddfb332c1796.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/2fdd71418999c348a9ba5f698315ddc8.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/354c3c84ead2f818f5222faa847fd2e7.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/39a3f185f0ff7aac3394205293ee9155.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/3f36e517cfa1d319e95f479d6a89b278.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/41ef8a2a64b251f4bd5655b8a64376b5.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/44a316057b3da071a0962231c3f1cf00.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/4518e79209edb580ad7676ed82ae172c.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/4b4f61477f147001132575ca58b15fe1.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/4e1cc37a477587a67d7a68d2cab74287.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/5629cfa3503164ef7b2231f05c3d42aa.png",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/571a172ee377a1abbfe23819edb2f770.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/5dd3f5417fd5ace9d56a64804e663c5a.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/60d428a7dc86c34b87c515683a92d593.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/622f518fb930d3f07d13236b3e4be7de.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/78578be83ec5b4a75c6a0d473a72ff35.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/7863fe0ef22283400dba3ef637ed3fc1.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/7ebcf5e6aa1fd132658fa1bf8e55e39e.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/9e51f4bc45ac15d0e4a64663089349c4.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/9f9f2bf61cf0cf65b87fc03654add163.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/a0a85ad28ac6542f780ba84d8e7fb797.png",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/a2554a6ee470358c1acbcbf1f17f2154.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/a98557f9a4619dd044cc941765e4ae0d.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/c07b3e465dc8a2c2f27cbc3109ee02aa.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/c6135c893b744abfb0d307afd71ffe98.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/ce21f7fcaca5b02024b169626243c03d.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/cfcd2dc6fa191eeea5fb5917a5c75896.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/d156b49840ccac7858044fb6a8258309.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/d671df67526faf05919114264e0ebf7a.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/daad936cfa07edc836426085ae74943b.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/db6dea115e2693044b4f2a702fc368b9.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/de735cc6b580c663047a900080880059.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/e78d673b773022f6b38ef61090804cb9.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/eafd15dd1d76e5f825283e227ec8e4c5.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/f4f2cdc6030baf089b24a844ca702537.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/fa5a183b8aefa06299c64bb4efed34b8.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/fad39d00376672e4ed6d89c15b55e911.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/faeaddc83780bbde8df24d9b52fa7a49.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/grass/fb9bbef0d9f948f2f884d1574350c9ed.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        }
      ]
    },
    {
      "id": "osean",
      "title": "OSEAN",
      "year": "2026",
      "essay": "Series photography collection: osean",
      "images": [
        {
          "src": "/images/osean/1108237420831272260.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/osean/1108237420831272345.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/osean/1108237420831272412.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/osean/1108237420831272424.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/osean/1108237420831272428.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/osean/1108237420831272432_Aquarium%20pose%20idea.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/osean/1108237420831272440.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/osean/1108237420831272456.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/osean/1108237420831272460.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/osean/1108237420831272478_%F0%9F%A9%B5.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/osean/1108237420831272479.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/osean/1108237420831272484.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/osean/1108237420831272491.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/osean/1108237420831565540.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        }
      ]
    },
    {
      "id": "portrait",
      "title": "PORTRAIT",
      "year": "2026",
      "essay": "Series photography collection: portrait",
      "images": [
        {
          "src": "/images/portrait/20210504-DSC00550-Enhanced-NR.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/portrait/20210504-DSC00569.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/portrait/20210505-DSC00939.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/portrait/20210505-DSC00993.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/portrait/a.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/portrait/d.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        }
      ]
    },
    {
      "id": "Roxy Migurdia",
      "title": "ROXY MIGURDIA",
      "year": "2026",
      "essay": "Series photography collection: Roxy Migurdia",
      "images": [
        {
          "src": "/images/Roxy%20Migurdia/20210505-DSC00710.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/Roxy%20Migurdia/20210505-DSC00711.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/Roxy%20Migurdia/20210505-DSC00713.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        }
      ]
    },
    {
      "id": "summer-mermaid",
      "title": "SUMMER-MERMAID",
      "year": "2026",
      "essay": "Series photography collection: summer-mermaid",
      "images": [
        {
          "src": "/images/summer-mermaid/20210505-DSC00841.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/summer-mermaid/20210505-DSC00843.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/summer-mermaid/20210505-DSC00844.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/summer-mermaid/20210505-DSC00846.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        }
      ]
    },
    {
      "id": "tomoyo cosplay",
      "title": "TOMOYO COSPLAY",
      "year": "2026",
      "essay": "Series photography collection: tomoyo cosplay",
      "images": [
        {
          "src": "/images/tomoyo%20cosplay/20210504-DSC00542.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/tomoyo%20cosplay/20210504-DSC00553.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/tomoyo%20cosplay/20210504-DSC00555.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        }
      ]
    },
    {
      "id": "Yao Guang Cosplay",
      "title": "YAO GUANG COSPLAY",
      "year": "2026",
      "essay": "Series photography collection: Yao Guang Cosplay",
      "images": [
        {
          "src": "/images/Yao%20Guang%20Cosplay/20210505-DSC00925.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/Yao%20Guang%20Cosplay/20210505-DSC00926.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/Yao%20Guang%20Cosplay/20210505-DSC00927.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/Yao%20Guang%20Cosplay/20210505-DSC00932.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/Yao%20Guang%20Cosplay/20210505-DSC00937.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/Yao%20Guang%20Cosplay/20210505-DSC00938.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/Yao%20Guang%20Cosplay/20210505-DSC00939.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/Yao%20Guang%20Cosplay/20210505-DSC00944.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        },
        {
          "src": "/images/Yao%20Guang%20Cosplay/20210505-DSC00947.jpg",
          "placeholder": "#202020",
          "aspectRatio": 1.5
        }
      ]
    }
  ],
  "shop": [
    {
      "id": "print-01",
      "title": "MONUMENTS NO. 4",
      "year": "2024",
      "type": "ARCHIVAL PIGMENT PRINT",
      "paper": "Hahnemühle Photo Rag 308gsm",
      "price": 450,
      "image": "/images/Graduation%20Photography/1108237420833724861.jpg",
      "placeholder": "#202020",
      "sizes": [
        "16 x 20 in (Edition of 10)",
        "24 x 30 in (Edition of 5)"
      ],
      "inStock": true
    },
    {
      "id": "print-02",
      "title": "CHRYSALISES NO. 2",
      "year": "2023",
      "type": "SILVER GELATIN PRINT",
      "paper": "Foma Fomabrom Variant 111",
      "price": 600,
      "image": "/images/Graduation%20Photography/1108237420833724863.jpg",
      "placeholder": "#202020",
      "sizes": [
        "20 x 24 in (Edition of 7)"
      ],
      "inStock": true
    }
  ],
  "about": {
    "bioParagraphs": [
      "Ngo Thanh Sinh is a contemporary photographer based in Vietnam, focusing on portraiture, cosplay art, and editorial storytelling.",
      "His work explores identity, atmosphere, and visual harmony through meticulously framed moments."
    ],
    "email": "contact@ngothanhsinh.com",
    "instagram": "@ngothanhsinh",
    "cvUrl": "#",
    "sideProjects": [
      {
        "title": "Personal Portfolio",
        "url": "#"
      }
    ]
  }
};
