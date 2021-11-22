# React Phys Color
React hook for changing a single CSS property along one of the R, G, or B axes. 
# Installation

Inside of your React app run

`npm install react-phys-color`

# Quick Start

```javascript 
import usePhysColor from 'react-phys-color'

function App() {
  const [styleBackground] = usePhysColor({
    style: {backgroundColor: ''},
  })
  const [styleText] = usePhysColor({
    style: {color: ''}
  })
  return (
    <div className="App">
      <div style={styleBackground}>
        <span>Hello World</span>
      </div>
      <div style={{...styleText,  fontSize: '48px'}}>
        Hello World!
      </div>
    </div>
  );
}
```

<p>
  <img src="https://media.giphy.com/media/xqVPWPKh5fDCgVxEcM/giphy.gif">
</P>

# Configuration

```javascript 
{
  style: {},
  colorRange: {
    from: "#000000",
    to: "#0000ff"
  },
  function: {
    fname: 'sine',
    params: {
      a: 127.5,
      freq: 0.005,
      offset: 127.5
    }
  }
}
```

`style`
The object containing a single CSS property that should be varied.

`colorRange`
Object containing from and to properties for specifying the `start` (from) and `end` (to) colors for a cycle

`function`
Object containing `fname` and `params`. Currently, `fname` defaults to `sine`, but `exp` can also be used. The properties of params depends on the function being used: 

`sine`:
* params: {
    a: number
    freq: number,
    offset: number
}

where the sine function is defined as a * Math.sin(2 * Math.PI * freq * t) + offset, and

`exp`
* params: {
    a: number,
    b: number,
    c: number
}

where the exponential function is defined as a * Math.exp(b * t) + c.
