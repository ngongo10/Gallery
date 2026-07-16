export interface Photo {
  src: string;
  placeholder: string; // HEX color representative of average image color
  aspectRatio: number; // width / height
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
  series: [
    {
      id: "osean",
      title: "OCEAN",
      year: "2026",
      essay: "A deep dive into the calm and turbulent moods of the sea. These images explore the vastness of the ocean, highlighting the interplay of light and water.",
      images: [
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
                "aspectRatio": 0.75
        },
        {
                "src": "/images/osean/1108237420831272428.jpg",
                "placeholder": "#202020",
                "aspectRatio": 0.75
        },
        {
                "src": "/images/osean/1108237420831272432_Aquarium pose idea.jpg",
                "placeholder": "#202020",
                "aspectRatio": 0.75
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
                "aspectRatio": 0.75
        },
        {
                "src": "/images/osean/1108237420831272478_🩵.jpg",
                "placeholder": "#202020",
                "aspectRatio": 0.75
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
                "aspectRatio": 0.75
        },
        {
                "src": "/images/osean/1108237420831565540.jpg",
                "placeholder": "#202020",
                "aspectRatio": 1.5
        }
]
    },
    {
      id: "portrait",
      title: "PORTRAIT",
      year: "2026",
      essay: "Intimate and expressive portraiture capturing human emotion and character. This series emphasizes subtle lighting and raw authenticity.",
      images: [
        {
                "src": "/images/portrait/a.jpg",
                "placeholder": "#202020",
                "aspectRatio": 1.5
        },
        {
                "src": "/images/portrait/b.jpg",
                "placeholder": "#202020",
                "aspectRatio": 0.75
        },
        {
                "src": "/images/portrait/c.jpg",
                "placeholder": "#202020",
                "aspectRatio": 0.75
        },
        {
                "src": "/images/portrait/d.jpg",
                "placeholder": "#202020",
                "aspectRatio": 0.75
        }
]
    },
    {
      id: "white-moonlight",
      title: "WHITE MOONLIGHT",
      year: "2026",
      essay: "Ethereal, high-key photography inspired by the concept of 'White Moonlight'. The visual narrative revolves around pure, nostalgic, and dreamy aesthetics.",
      images: [
        {
                "src": "/images/white-moonlight/0a4eca0e235c474c7ba22f5e24714d85.jpg",
                "placeholder": "#202020",
                "aspectRatio": 1.5
        },
        {
                "src": "/images/white-moonlight/1a796e0dd260fa3867658dfa19461d1d.jpg",
                "placeholder": "#202020",
                "aspectRatio": 1.5
        },
        {
                "src": "/images/white-moonlight/1ad84b9ab4a1e2ab17c7aab37fcff0a5.jpg",
                "placeholder": "#202020",
                "aspectRatio": 1.5
        },
        {
                "src": "/images/white-moonlight/1b2e945ffa23f7894ab00477d215a186.jpg",
                "placeholder": "#202020",
                "aspectRatio": 1.5
        },
        {
                "src": "/images/white-moonlight/1fe9747ba4bdd57114872a81f3e0148f.jpg",
                "placeholder": "#202020",
                "aspectRatio": 0.75
        },
        {
                "src": "/images/white-moonlight/3ca47f896b0f0bf998ee7e31cce0c75e.webp",
                "placeholder": "#202020",
                "aspectRatio": 1.5
        },
        {
                "src": "/images/white-moonlight/3eb002f7a2c129e37447f1056f87481d.jpg",
                "placeholder": "#202020",
                "aspectRatio": 0.75
        },
        {
                "src": "/images/white-moonlight/510a21f0b8a190b95a94a17a5e151873.jpg",
                "placeholder": "#202020",
                "aspectRatio": 1.5
        },
        {
                "src": "/images/white-moonlight/60cbd670063cf5c8756d1d4abd237efa.jpg",
                "placeholder": "#202020",
                "aspectRatio": 1.5
        },
        {
                "src": "/images/white-moonlight/76dd82f2e6fa6a8c33c395911421b133.jpg",
                "placeholder": "#202020",
                "aspectRatio": 1.5
        },
        {
                "src": "/images/white-moonlight/791b09a459ae31ae3d8278eb4d502044.jpg",
                "placeholder": "#202020",
                "aspectRatio": 1.5
        },
        {
                "src": "/images/white-moonlight/852e934d99aa22fd07e507ea13a54b4b.jpg",
                "placeholder": "#202020",
                "aspectRatio": 1.5
        },
        {
                "src": "/images/white-moonlight/aee685e268f0d1b816edbf72d1916fe7.jpg",
                "placeholder": "#202020",
                "aspectRatio": 1.5
        },
        {
                "src": "/images/white-moonlight/b49fbfea071ec0f77610868f6f14f83f.jpg",
                "placeholder": "#202020",
                "aspectRatio": 0.75
        },
        {
                "src": "/images/white-moonlight/bc62ee7ceaab64c37f210ea6f6ec5041.jpg",
                "placeholder": "#202020",
                "aspectRatio": 1.5
        },
        {
                "src": "/images/white-moonlight/cf03bc669807edd6a0878bdf19a68698.jpg",
                "placeholder": "#202020",
                "aspectRatio": 0.75
        },
        {
                "src": "/images/white-moonlight/d21a73b3e8d638eb258997ad54913f03.jpg",
                "placeholder": "#202020",
                "aspectRatio": 0.75
        },
        {
                "src": "/images/white-moonlight/d6a90e2dc25c81cb85dbb090607ae41c.jpg",
                "placeholder": "#202020",
                "aspectRatio": 0.75
        },
        {
                "src": "/images/white-moonlight/d6e8bf1ae07e47f524fee23527303b94.jpg",
                "placeholder": "#202020",
                "aspectRatio": 1.5
        },
        {
                "src": "/images/white-moonlight/db39ef4bf3bdbc56802825100be51a73.jpg",
                "placeholder": "#202020",
                "aspectRatio": 1.5
        },
        {
                "src": "/images/white-moonlight/e5f1a7274a4a92c40e5ee63007939936.jpg",
                "placeholder": "#202020",
                "aspectRatio": 1.5
        },
        {
                "src": "/images/white-moonlight/e7acb42b11bfe6be32a1c2d9d3027c04.jpg",
                "placeholder": "#202020",
                "aspectRatio": 1.5
        },
        {
                "src": "/images/white-moonlight/e9511e877943b46579595efa4eee1c9d.jpg",
                "placeholder": "#202020",
                "aspectRatio": 0.75
        },
        {
                "src": "/images/white-moonlight/ea4d9108d4b6049cb005caf77182ed77.jpg",
                "placeholder": "#202020",
                "aspectRatio": 0.75
        },
        {
                "src": "/images/white-moonlight/ea9d5559580b93384c2943de28dc0aee.jpg",
                "placeholder": "#202020",
                "aspectRatio": 0.75
        },
        {
                "src": "/images/white-moonlight/ee78f827d13e75a6d511d4e55762deed.jpg",
                "placeholder": "#202020",
                "aspectRatio": 1.5
        },
        {
                "src": "/images/white-moonlight/f71be5629ec46e487f8404d46ad3440c.jpg",
                "placeholder": "#202020",
                "aspectRatio": 0.75
        }
]
    },
    {
          "id": "grass",
          "title": "GRASS",
          "year": "2026",
          "essay": "A vibrant exploration of nature's simplest yet most resilient creation. These images capture the delicate textures, dynamic movements, and refreshing hues of grass in various environments.",
          "images": [
                {
                      "src": "/images/grass/0505276dcaa53a08facc7774d01224f7.jpg",
                      "placeholder": "#304020",
                      "aspectRatio": 0.75
                },
                {
                      "src": "/images/grass/0521e357d66b2383561c0675d5e39831.png",
                      "placeholder": "#304020",
                      "aspectRatio": 1.5
                },
                {
                      "src": "/images/grass/0742c8a7a057634bf6e15c3f920ece9b.jpg",
                      "placeholder": "#304020",
                      "aspectRatio": 1.5
                },
                {
                      "src": "/images/grass/0fb42351c4ddf68288e31b205d3661ef.jpg",
                      "placeholder": "#304020",
                      "aspectRatio": 1.5
                },
                {
                      "src": "/images/grass/0ff1699a8f2d4b4298150e87f8abbe6f.jpg",
                      "placeholder": "#304020",
                      "aspectRatio": 1.5
                },
                {
                      "src": "/images/grass/1560ffb7fb7c892fe2e556bb14dcfcc9.jpg",
                      "placeholder": "#304020",
                      "aspectRatio": 0.75
                },
                {
                      "src": "/images/grass/17b910e23b73b5e9608dbbb08585ed46.jpg",
                      "placeholder": "#304020",
                      "aspectRatio": 1.5
                },
                {
                      "src": "/images/grass/1e6a901307699ad320f51c23476caa8f.jpg",
                      "placeholder": "#304020",
                      "aspectRatio": 1.5
                },
                {
                      "src": "/images/grass/1f3ca4b3733096e73496f6ba6df06665.jpg",
                      "placeholder": "#304020",
                      "aspectRatio": 0.75
                },
                {
                      "src": "/images/grass/223ddb17a4716a361675880cb406286a.jpg",
                      "placeholder": "#304020",
                      "aspectRatio": 0.75
                },
                {
                      "src": "/images/grass/2a5e64e87aa8f5acba8e9f6733b3f9df.jpg",
                      "placeholder": "#304020",
                      "aspectRatio": 0.75
                },
                {
                      "src": "/images/grass/2eebdd95fad3c95e2378ddfb332c1796.jpg",
                      "placeholder": "#304020",
                      "aspectRatio": 0.75
                },
                {
                      "src": "/images/grass/2fdd71418999c348a9ba5f698315ddc8.jpg",
                      "placeholder": "#304020",
                      "aspectRatio": 1.5
                },
                {
                      "src": "/images/grass/354c3c84ead2f818f5222faa847fd2e7.jpg",
                      "placeholder": "#304020",
                      "aspectRatio": 0.75
                },
                {
                      "src": "/images/grass/39a3f185f0ff7aac3394205293ee9155.jpg",
                      "placeholder": "#304020",
                      "aspectRatio": 1.5
                },
                {
                      "src": "/images/grass/3f36e517cfa1d319e95f479d6a89b278.jpg",
                      "placeholder": "#304020",
                      "aspectRatio": 0.75
                },
                {
                      "src": "/images/grass/41ef8a2a64b251f4bd5655b8a64376b5.jpg",
                      "placeholder": "#304020",
                      "aspectRatio": 0.75
                },
                {
                      "src": "/images/grass/44a316057b3da071a0962231c3f1cf00.jpg",
                      "placeholder": "#304020",
                      "aspectRatio": 0.75
                },
                {
                      "src": "/images/grass/4518e79209edb580ad7676ed82ae172c.jpg",
                      "placeholder": "#304020",
                      "aspectRatio": 1.5
                },
                {
                      "src": "/images/grass/4b4f61477f147001132575ca58b15fe1.jpg",
                      "placeholder": "#304020",
                      "aspectRatio": 1.5
                },
                {
                      "src": "/images/grass/4e1cc37a477587a67d7a68d2cab74287.jpg",
                      "placeholder": "#304020",
                      "aspectRatio": 1.5
                },
                {
                      "src": "/images/grass/5629cfa3503164ef7b2231f05c3d42aa.png",
                      "placeholder": "#304020",
                      "aspectRatio": 0.75
                },
                {
                      "src": "/images/grass/571a172ee377a1abbfe23819edb2f770.jpg",
                      "placeholder": "#304020",
                      "aspectRatio": 0.75
                },
                {
                      "src": "/images/grass/5dd3f5417fd5ace9d56a64804e663c5a.jpg",
                      "placeholder": "#304020",
                      "aspectRatio": 0.75
                },
                {
                      "src": "/images/grass/60d428a7dc86c34b87c515683a92d593.jpg",
                      "placeholder": "#304020",
                      "aspectRatio": 0.75
                },
                {
                      "src": "/images/grass/622f518fb930d3f07d13236b3e4be7de.jpg",
                      "placeholder": "#304020",
                      "aspectRatio": 1.5
                },
                {
                      "src": "/images/grass/78578be83ec5b4a75c6a0d473a72ff35.jpg",
                      "placeholder": "#304020",
                      "aspectRatio": 0.75
                },
                {
                      "src": "/images/grass/7863fe0ef22283400dba3ef637ed3fc1.jpg",
                      "placeholder": "#304020",
                      "aspectRatio": 1.5
                },
                {
                      "src": "/images/grass/7ebcf5e6aa1fd132658fa1bf8e55e39e.jpg",
                      "placeholder": "#304020",
                      "aspectRatio": 1.5
                },
                {
                      "src": "/images/grass/9e51f4bc45ac15d0e4a64663089349c4.jpg",
                      "placeholder": "#304020",
                      "aspectRatio": 1.5
                },
                {
                      "src": "/images/grass/9f9f2bf61cf0cf65b87fc03654add163.jpg",
                      "placeholder": "#304020",
                      "aspectRatio": 0.75
                },
                {
                      "src": "/images/grass/a0a85ad28ac6542f780ba84d8e7fb797.png",
                      "placeholder": "#304020",
                      "aspectRatio": 0.75
                },
                {
                      "src": "/images/grass/a2554a6ee470358c1acbcbf1f17f2154.jpg",
                      "placeholder": "#304020",
                      "aspectRatio": 0.75
                },
                {
                      "src": "/images/grass/a98557f9a4619dd044cc941765e4ae0d.jpg",
                      "placeholder": "#304020",
                      "aspectRatio": 0.75
                },
                {
                      "src": "/images/grass/c07b3e465dc8a2c2f27cbc3109ee02aa.jpg",
                      "placeholder": "#304020",
                      "aspectRatio": 1.5
                },
                {
                      "src": "/images/grass/c6135c893b744abfb0d307afd71ffe98.jpg",
                      "placeholder": "#304020",
                      "aspectRatio": 0.75
                },
                {
                      "src": "/images/grass/ce21f7fcaca5b02024b169626243c03d.jpg",
                      "placeholder": "#304020",
                      "aspectRatio": 1.5
                },
                {
                      "src": "/images/grass/cfcd2dc6fa191eeea5fb5917a5c75896.jpg",
                      "placeholder": "#304020",
                      "aspectRatio": 1.5
                },
                {
                      "src": "/images/grass/d156b49840ccac7858044fb6a8258309.jpg",
                      "placeholder": "#304020",
                      "aspectRatio": 0.75
                },
                {
                      "src": "/images/grass/d671df67526faf05919114264e0ebf7a.jpg",
                      "placeholder": "#304020",
                      "aspectRatio": 0.75
                },
                {
                      "src": "/images/grass/daad936cfa07edc836426085ae74943b.jpg",
                      "placeholder": "#304020",
                      "aspectRatio": 0.75
                },
                {
                      "src": "/images/grass/db6dea115e2693044b4f2a702fc368b9.jpg",
                      "placeholder": "#304020",
                      "aspectRatio": 1.5
                },
                {
                      "src": "/images/grass/de735cc6b580c663047a900080880059.jpg",
                      "placeholder": "#304020",
                      "aspectRatio": 1.5
                },
                {
                      "src": "/images/grass/e78d673b773022f6b38ef61090804cb9.jpg",
                      "placeholder": "#304020",
                      "aspectRatio": 1.5
                },
                {
                      "src": "/images/grass/eafd15dd1d76e5f825283e227ec8e4c5.jpg",
                      "placeholder": "#304020",
                      "aspectRatio": 1.5
                },
                {
                      "src": "/images/grass/f4f2cdc6030baf089b24a844ca702537.jpg",
                      "placeholder": "#304020",
                      "aspectRatio": 0.75
                },
                {
                      "src": "/images/grass/fa5a183b8aefa06299c64bb4efed34b8.jpg",
                      "placeholder": "#304020",
                      "aspectRatio": 1.5
                },
                {
                      "src": "/images/grass/fad39d00376672e4ed6d89c15b55e911.jpg",
                      "placeholder": "#304020",
                      "aspectRatio": 0.75
                },
                {
                      "src": "/images/grass/faeaddc83780bbde8df24d9b52fa7a49.jpg",
                      "placeholder": "#304020",
                      "aspectRatio": 0.75
                },
                {
                      "src": "/images/grass/fb9bbef0d9f948f2f884d1574350c9ed.jpg",
                      "placeholder": "#304020",
                      "aspectRatio": 0.75
                }
          ]
    }
  ],
  shop: [
    {
      id: "portrait-photography",
      title: "Portrait Photography",
      year: "",
      type: "Service",
      paper: "",
      price: 800000,
      image: "/images/shop-portrait.jpg",
      placeholder: "#202020",
      sizes: [],
      inStock: true
    },
    {
      id: "concept-photography",
      title: "Concept Photography",
      year: "",
      type: "Service",
      paper: "",
      price: 800000,
      image: "/images/white-moonlight/0a4eca0e235c474c7ba22f5e24714d85.jpg",
      placeholder: "#202020",
      sizes: [],
      inStock: true
    },
    {
      id: "cinematic-film",
      title: "Cinematic Film",
      year: "",
      type: "Service",
      paper: "",
      price: 800000,
      image: "/images/mysterious-light/1108237420830224868.jpg",
      placeholder: "#202020",
      sizes: [],
      inStock: true
    }
  ],
  about: {
    bioParagraphs: [
      "Sinh là một nhiếp ảnh gia tự do. Anh ấy thổi hồi vào tất cả bức ảnh để dệt thành một câu chuyện mà anh ấy đã trải qua. một tâm lý của những kẻ hay đặt câu hỏi vì sao mà đôi khi không có một câu trả lời rõ ràng. Mỗi câu chuyện là một ý nghĩa khác nhau. Vầy...? Ý nghĩa đó là gì?",
      "Tôi tin rằng mỗi khung hình đều có thể kể một câu chuyện. Những gì tôi theo đuổi không phải là sự hoàn hảo. Tôi theo đuổi những hình ảnh giàu cảm xúc, nơi ánh sáng, bố cục và màu sắc hòa quyện để tạo nên bầu không khí riêng. Lấy cảm hứng từ điện ảnh, nhiếp ảnh và hội họa, tôi hướng đến những tác phẩm mang vẻ đẹp vượt khỏi thời gian, đề cao sự tinh giản, chiều sâu và cảm xúc hơn mọi xu hướng nhất thời."
    ],
    email: "ngothanhsinh138@gmail.com",
    instagram: "https://www.instagram.com/ngothanhsinh136/",
    cvUrl: "#",
    sideProjects: []
  }
};
