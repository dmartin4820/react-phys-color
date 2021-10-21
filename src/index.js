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
      to: {r:3, g:0, b:0, a:1}
    }
  }
  let from;
  let to;
  let dimension;
  
  //assumes userOptions.colorRange object key values are strings
  if (userOptions.colorRange) {
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
        setStyle(functions.sine(internalCounter, 127.5, .005, 127.5))
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
    let outputRGB = ''

    switch(dimension) {
      case('r'):
        outputRGB = `rgb(${value}, 0, 0)`
        break
      case('g'):
        outputRGB = `rgb(0, ${value}, 0)`
        break
      case('b'):
        outputRGB = `rgb(0, 0, ${value})`
        break
    }
    newStyle[styleProp] = outputRGB
    _setStyle(newStyle)
  }

  if (options.syncTime) {
    output.push(0)
  }
  return output
}
export default usePhysColor
