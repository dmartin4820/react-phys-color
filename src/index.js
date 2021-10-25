import functions from '../utils/functions'
import { 
  getRGBValues,
  getChangingDimension,
  checkColorType,
  hexToRGB
} from '../utils/colorConvert'
import {useState, useEffect} from 'react'

//usePhysColor hook
//currently supports only single dimension (r, g, or b) change in color
function usePhysColor(userOptions = {}) {
  let options = {
    style: {}, 
    syncTime: false,
    colorRange: {
      from: {r:0, g:0, b:0, a:1},
      to: {r:0, g:0, b:255, a:1}
    },
    function: {
      fname: 'sine',
      params: {
        a: 127.5,
        freq: .005,
        offset: 127.5,
      },
    }
  }
  let from;
  let to;
  let dimension;
  
  //assumes userOptions.colorRange object key values are strings
  if (userOptions.colorRange) {
    // const convertCodes = (output, input) => {
    //   return input === 'hex' ? hexToRGB(input): getRGBValues(input)
    // }
    // const convertCodes = (output, input) => {
    //   switch (input) {
    //     case 'hex': 
    //       output = hexToRGB(input)
    //       break
    //     case 'rgb':
    //       output = getRGBValues(input)
    //       break
    //     default:
    //       output = {r:0, g:0, b:0, a: 1}
    //   };
    // }
    // convertCodes(from, userOptions.colorRange.from)
    // convertCodes(to, userOptions.colorRange.to)
    switch (checkColorType(userOptions.colorRange.from)) {
      case 'hex': 
        from = hexToRGB(userOptions.colorRange.from)
        break
      case 'rgb':
        from = getRGBValues(userOptions.colorRange.from)
        break
    };
    switch (checkColorType(userOptions.colorRange.to)) {
      case 'hex': 
        to = hexToRGB(userOptions.colorRange.to)
        break
      case 'rgb':
        to = getRGBValues(userOptions.colorRange.to)
        break
    };
    dimension = getChangingDimension(from, to)
  } else {
    //default options
    dimension = getChangingDimension(options.colorRange.from, options.colorRange.to)
  }
  
  Object.assign(options, userOptions)
  options.function.f = functions.getFunction(options.function.fname)
  
  const [_style, _setStyle] = useState({...options.style})
  const [internalCounter, setInternalCounter] = useState(0) 
  const output = [_style]
  
  if (options.style && Object.getOwnPropertyNames(options.style).length > 1) {
    throw new Error('Only one CSS property can be specified in usePhysColor options')
  }

  if (!(!Array.isArray(options.style) && typeof options.style === 'object')) {
    throw new Error('Style must be an object')
  }

  if (typeof options.syncTime !== 'boolean') {
    throw new Error('syncTime must be a boolean')
  }

  useEffect(() => {
    let interval = setInterval(() => {
      setInternalCounter(internalCounter => {
        setStyle(functions.getCurrValue(
          options.function.f,
          internalCounter,
          options.function.params
        ))
        return internalCounter + 1
      })
    }, 1)

    return () => {
      clearInterval(interval)
    }
  },[])

  function setStyle(value) {
    const newStyle = {}
    const styleProp = Object.getOwnPropertyNames(options.style)[0]//assuming only one CSS property

    let rgba = options.colorRange.from
    rgba[dimension] = value
    let outputRGB = objToString(rgba)

    newStyle[styleProp] = outputRGB
    _setStyle(newStyle)
  }

  if (options.syncTime) {
    output.push(0)
  }
  return output
}
export default usePhysColor
