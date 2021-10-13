const checkColorType = (string) => {
  let rgbRegEx = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/ //eg `rgb(13, 142, 12)`
  let rgbaRegEx = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3}), (\d{1,2})\)/ //e.g. `rgb(13, 142, 12, 13)`

  if (rgbRegEx.exec(string) || rgbaRegEx.exec(string)) {
    return 'rgb'
  } else if (string[0] === '#') {
    return 'hex'
  } else throw new Error('Color value is not hex or rgb value. Ensure spaces between values in rgb (e.g. "rgb(13, 142, 12)")')
}

const hexToRGB = (hex) => {
  if (typeof hex !== 'string' || hex[0] !== '#' || hex.length < 7) {
    throw new Error("Input must be in hex format (e.g.: '#15ff00')")
  }
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const a = hex.slice(7, 9)/100

  //object contains RGB values
  const rgb = { r, g, b, a }

  return rgb
}

module.exports = {
  hexToRGB,
  checkColorType
}