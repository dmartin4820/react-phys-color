import functions from './functions'
import {useState, useEffect} from 'react'

function usePhysColor(options = {style: {}, syncTime: false}) {
  const [_style, setStyle] = useState({...options.style})
  const [internalCounter, setInternalCounter] = useState(0)
  
  const output = [_style]
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

  // function setBg(value) {
  //   setStyle({
  //     ...style,
  //     backgroundColor: `rgb(0, 0, ${value})`
  //   })
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
