import './test_phys_color.css'
import {useEffect, useState} from 'react'

export default function Test_phys_color() {
  const [style, setStyle] = useState({
    backgroundColor: 'rgb(0, 0, 127.5)'
  })
  const [compCounter, setCounter] = useState(0)

  useEffect(() => {
    let interval = setInterval(() => {
      setCounter(compCounter => {
        setBg(sine(compCounter, 127.5, .005, 127.5))
        return compCounter + 1
      })
    }, 1)

    return () => {
      clearInterval(interval)
    }
  },[])

  //time, amplitude, frequency
  function sine(t, A, f, offset) {
    return A * Math.sin(2*Math.PI * f * t) + offset
  }

  function setBg(value) {
    setStyle({
      ...style,
      backgroundColor: `rgb(0, 0, ${value})`
    })
  }

  return (
    <div className="container">
      <div className="content" style={style}> Hello </div>
      <span>{sine(compCounter, 127.5, .005, 127.5)}</span>
    </div>
  )
}
