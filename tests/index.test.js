import usePhysColor from '../src/index'
import {renderHook} from '@testing-library/react-hooks'


describe('Output', () => {
  it('should return an array', () => {
    const { result } = renderHook(() => usePhysColor())
    expect(Array.isArray(result.current)).toBeTruthy()
  })

  it('should return an array with a style object', () => {
    const { result } = renderHook(() => usePhysColor())
    const [style] = result.current

    expect(!Array.isArray(style) && typeof style === 'object').toBeTruthy()
  })

  it('should return an array containing a timeStep number if given syncTime is true in options', () => {
    const { result } = renderHook(() => usePhysColor({syncTime: true}))
    const initialTimeStep = 0
    // const expected = [initialTimeStep]
    const expected = [{value: initialTimeStep}]

    let output = result.current 
    expect(output).toEqual(expect.arrayContaining(expected))

    output = usePhysColor({})
    expect(output).toEqual(expect.not.arrayContaining(expected))
  })

  // it('should return a style object with the same properties as the input style', () => {
  //   const inputStyle = {
  //     backgroundColor: ''
  //   }
  //   const [style] = usePhysColor({style: inputStyle})
  //   const properties = Object.getOwnPropertyNames(style)
  //   console.log(properties)
  //   const inputProperties = Object.getOwnPropertyNames(inputStyle)
  //   console.log(inputProperties)
    
  //   expect(properties[0] === inputProperties[0]).toBeTruthy()
  // })
})

