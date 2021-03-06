export default {
  image: [
    {
      name: "Compress",
      route: "compress",
      params: [
        {
          name: "max",
          pointer: 2,
          type: "button",
          title:
            "For maximum compress to get the smallest file size possible(Effects the quality)."
        },
        {
          name: "normal",
          pointer: 2,
          type: "button",
          title: "For avarage compress to get a bigger file size."
        },
        {
          name: "min",
          pointer: 2,
          type: "button",
          title:
            "For minumum compress.Best for situations when you need a photo with better quality."
        }
      ]
    },
    {
      name: "Change Type",
      route: "changeDocType",
      params: [
        { name: "jpg", pointer: 2, type: "button" },
        { name: "png", pointer: 2, type: "button" },
        { name: "bmp", pointer: 2, type: "button" }
      ]
    },
    {
      name: "Resize",
      route: "resize",
      params: [
        { name: "width", pointer: 2, type: "input" },
        { name: "height", pointer: 3, type: "input" },
        { name: "persentage", pointer: 4, type: "input" }
      ]
    }
  ],
  pdf: [
    {
      name: "Compress",
      route: "compress",
      params: [
        { name: "max", pointer: 2, type: "button" },
        { name: "normal", pointer: 2, type: "button" },
        { name: "min", pointer: 2, type: "button" }
      ]
    },
    {
      name: "Split",
      route: "split",
      params: [
        { name: "from", pointer: 2, type: "input" },
        { name: "to", pointer: 3, type: "input" }
      ]
    }
  ]
}
