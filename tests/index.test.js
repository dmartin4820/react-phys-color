import usePhysColor from '../src/index'

describe('Output', () => {
  it('should return an array', () => {
    const output = usePhysColor({})
    expect(Array.isArray(output)).toBeTruthy()
  })

  it('should return an array with a style object', () => {
    const [style] = usePhysColor({})
    expect(!Array.isArray(style) && typeof style === 'object').toBeTruthy()
  })

  it('should return an array containing a timeStep number if given syncTime is true in options', () => {
    const timeStep = 0
    const expected = [timeStep]
    let output = usePhysColor({syncTime: true})
    expect(output).toEqual(expect.arrayContaining(expected))

    output = usePhysColor({})
    expect(output).toEqual(expect.not.arrayContaining(expected))
  })

  it('should return a style object with the same properties as the input style', () => {
    const inputStyle = {
      backgroundColor: ''
    }
    const [style] = usePhysColor({style: inputStyle})
    const properties = Object.getOwnPropertyNames(style)
    console.log(properties)
    const inputProperties = Object.getOwnPropertyNames(inputStyle)
    console.log(inputProperties)

    
    expect(properties[0] === inputProperties[0]).toBeTruthy()
  })
})

