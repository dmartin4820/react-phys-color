import {useState, useEffect} from 'react'

import {
  getRGBValues,
  getChangingDimension,
  checkColorType,
  hexToRGB,
  objToString,
  setupFunction,
  getFunction,
  getCurrValue} from './utils'

//usePhysColor hook
//currently supports only single dimension (r, g, or b) change in color
function usePhysColor(userOptions = {}, reset) {
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
        freq: .005, //default value; will implement feature to be able to change frequency
        offset: 127.5,
      },
      f: getFunction('sine')
    }
  }
  
  configure()
  const dimension = getChangingDimension(
    options.colorRange.from, 
    options.colorRange.to,
    options.function.fname)
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
        setStyle(getCurrValue(
          options.function.f,
          internalCounter,
          options.function.params
        ))
        return internalCounter + 1
      })
    }, 1)

    console.log('reset')
    return () => {
      clearInterval(interval)
    }
  },[])

  useEffect(() => {
    setInternalCounter(0)
  }, [reset])

  function setStyle(value) {
    const newStyle = {}
    const styleProp = Object.getOwnPropertyNames(options.style)[0]//assuming only one CSS property

    let rgba = options.colorRange.from
    rgba[dimension] = value
    let outputRGB = objToString(rgba)

    newStyle[styleProp] = outputRGB
    _setStyle(newStyle)
  }

  function configure() {
    if (userOptions.colorRange) {
      const convertCodes = (input) => {
        return checkColorType(input) === 'hex' ? hexToRGB(input): getRGBValues(input)
      }
      const from = convertCodes(userOptions.colorRange.from)
      const to = convertCodes(userOptions.colorRange.to)
    
      Object.assign(userOptions.colorRange, {from, to})
    } 
    Object.assign(options, userOptions)
    Object.assign(options.function.f, getFunction(options.function.fname))
    const dimension = getChangingDimension(
      options.colorRange.from, 
      options.colorRange.to, 
      options.function.fname)
    const modifiedFunction = setupFunction({
      from: options.colorRange.from[dimension],
      to: options.colorRange.to[dimension],
      freq: 0.005
    }, options.function)
 
    Object.assign(options.function, modifiedFunction)
  }

  if (options.syncTime) {
    output.push(0)
  }
  return output
}


export default usePhysColor