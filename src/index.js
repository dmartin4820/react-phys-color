import functions from './functions'
import { getRGBValues, getChangingDimension} from '../utils/colorConvert'
import {useState, useEffect} from 'react'

//usePhysColor hook
//currently supports only single dimension (r, g, or b) change in color
function usePhysColor(userOptions = {}) {
  let options = {
    style: {}, 
    syncTime: false,
    colorRange: {
      from: 'rgb(0, 0, 0)',
      to: 'rgb(0,0,255)'
    }
  }

  //Add code here to check if colorRange from and to contain hex values, if so, convert to rgb

  //Also create variable indicating which dimension is changing

  let dimension = ''
  if (userOptions.colorRange) {
    const from = getRGBValues(userOptions.colorRange.from)
    const to = getRGBValues(userOptions.colorRange.to)
    dimension = getChangingDimension(from, to)
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

  // useEffect(() => {
  //   let interval = setInterval(() => {
  //     setCounter(internalCounter => {
  //       setBg(functions.sine(internalCounter, 127.5, .005, 127.5))
  //       return internalCounter + 1
  //     })
  //   }, 1)

  //   return () => {
  //     clearInterval(interval)
  //   }
  // },[])

  // // function setBg(value) {
  // //   setStyle({
  // //     ...style,
  // //     backgroundColor: `rgb(0, 0, ${value})`
  // //   })
  // // } 

  // function setStyle(value) {
  //   const newStyle = {}
  //   const styleProp = Object.getOwnPropertyNames()[0] //assuming only one CSS property
  //   const outputRGB = ''

  //   switch(dimension) {
  //     case('r'):
  //       outputRGB.concat(`rgb(${value}, 0, 0)`)
  //       break
  //     case('g'):
  //       outputRGB.concat(`rgb(0, ${value}, 0)`)
  //       break
  //     case('b'):
  //       outputRGB.concat(`rgb(0, 0, ${value})`)
  //   }

  //   newStyle[styleProp] = outputRGB 
  //   setStyle(newStyle)
  // }

  if (options.syncTime) {
    output.push(0)
  }

  return output
}

export default usePhysColor


// import React from 'react'

// export default function index() {
//   const [counter, setCounter] = setState(0)
//   let timer = setInterval(someFunction, 1000) //counter is incremented every second

//   const [style1, timeStep] = usePhysColor({counter})
//   const style2 = usePhysColor({counter: timeStep})
//   return (
//     <div>
      
//     </div>
//   )
// }
