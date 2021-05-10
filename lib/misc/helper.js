export const imgToBase64 = (e) => {
  return new Promise(function (resolve) {
    const url = URL.createObjectURL(e.target.files[0])
    const img = new Image()
    // To prevent: "Uncaught SecurityError: Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported."
    img.crossOrigin = 'Anonymous'
    img.onload = function () {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      const dataURL = canvas.toDataURL('image/png')
      // resolve(dataURL.replace(/^data:image\/(png|jpg|jpeg|pdf);base64,/, ''))
      resolve(dataURL)
    }
    img.src = url
  })
}

export const goTo = (payload, params) => {
  this.$router.push({ name: payload, params })
}
