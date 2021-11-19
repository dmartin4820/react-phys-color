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
  if (
    typeof hex !== 'string' 
    || hex[0] !== '#' 
    || hex.length < 7 
    || hex.length > 9
    ) {
    throw new Error("Input must be in hex format (e.g.: '#15ff00')")
  }
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  if (hex.slice(7, 9) || hex.slice(7,9 === '00')) {
    var a = hex.slice(7, 9)/100
  } else {
    var a = 1 //default to 1 if opacity not included
  }

  //object contains RGBA values
  const rgb = { r, g, b, a }

  return rgb
}

const getRGBValues = (rgbString) => {
  let rgb = rgbString.trim()//
  rgb = rgb.substring(4, rgb.length-1)
  rgb = rgb.split(',')
  rgb = rgb.map(dimension => parseInt(dimension, 10))
  
  
  return {r: rgb[0], g: rgb[1], b: rgb[2], a: 1}
}

const getChangingDimension = (from, to, fname) => {
  let dimension = ''
  let isChanging = false
  for (let _dimension in from) {
    const toDimension = to[_dimension]
    const fromDimension = from[_dimension]
    const delta = toDimension - fromDimension
    
    switch(fname) {
      case('exp'):
        if (Math.abs(delta) > 0 && !isChanging) {
          isChanging = true
          dimension = _dimension
        }
        break
      case('sine'): 
        if (delta > 0 && !isChanging) {
          isChanging = true
          dimension = _dimension
        } else if (delta !== 0) {
          throw new Error('One value associated with "to" keys must be greater than "from" values')
        }
        break
      default:
        throw new Error('No function type specified')
    }
  }

  return dimension
}

const objToString = (rgba) => {
  return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`
}

export {
  hexToRGB,
  checkColorType,
  getRGBValues,
  getChangingDimension,
  objToString
}