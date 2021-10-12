const hexToRGB = (hex) => {
  if (typeof hex !== 'string' || hex[0] !== '#' || hex.length !== 7) {
    throw new Error("Input must be in hex format (e.g.: '#15ff00')")
  }
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  //object contains RGB values
  const rgb = { r, g, b }

  return rgb
}


module.exports = {
  hexToRGB
}