import functions from '../utils/functions'
import { getRGBValues, getChangingDimension} from '../utils/colorConvert'
import {useState, useEffect} from 'react'

//usePhysColor hook
//currently supports only single dimension (r, g, or b) change in color
function usePhysColor(userOptions = {}) {
  let options = {
    style: {}, 
    syncTime: false,
    colorRange: {
      from: {r:0, g:0, b:80, a:1},
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

  //Add code here to check if colorRange from and to contain hex values, if so, convert to rgb

  //Also create variable indicating which dimension is changing

  let dimension = getChangingDimension(options.colorRange.from, options.colorRange.to)
  if (userOptions.colorRange) {
    const from = getRGBValues(userOptions.colorRange.from)
    const to = getRGBValues(userOptions.colorRange.to)
    dimension = getChangingDimension(from, to)
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
