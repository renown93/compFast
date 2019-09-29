export default {
  image: [
    {
      name: "Compress",
      route: "compress",
      params: [
        { name: "max", pointer: 2 },
        { name: "normal", pointer: 2 },
        { name: "min", pointer: 2 }
      ]
    },
    {
      name: "Change Type",
      route: "changeDocType",
      params: [
        { name: "pdf", pointer: 2 },
        { name: "png", pointer: 2 },
        { name: "bmp", pointer: 2 }
      ]
    },
    {
      name: "Resize",
      route: "resize",
      params: [
        { name: "width", pointer: 2 },
        { name: "height", pointer: 3 },
        { name: "persentage", pointer: 4 }
      ]
    }
  ],
  pdf: [
    {
      name: "Compress",
      route: "compress",
      params: [
        { name: "max", pointer: 2 },
        { name: "normal", pointer: 2 },
        { name: "min", pointer: 2 }
      ]
    },
    {
      name: "Split",
      route: "split",
      params: [{ name: "from", pointer: 2 }, { name: "to", pointer: 3 }]
    }
  ]
}
