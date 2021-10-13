import usePhysColor from '../src/index'
import {renderHook} from '@testing-library/react-hooks'

describe('Input', () => {
  it('should throw an error if style contains more than one CSS property', () => {
    var { result } = renderHook(() => usePhysColor({
      style: {
        backgroundColor: '',
        color: ''
      }
    }))
    const expected = Error('Only one CSS property can be specified in usePhysColor options')

    expect(result.error).toEqual(expected)

    var { result } = renderHook(() => usePhysColor({
      style: {
        backgroundColor: ''
      }
    }))

    expect(result.error).toBeUndefined()

  })

  it('should throw an error if style is not an object', () => {
    var { result } = renderHook(() => usePhysColor({
      style: []
    }))

    const expected = Error('Style must be an object')

    expect(result.error).toEqual(expected)

    var { result } = renderHook(() => usePhysColor())

    expect(result.error).toBeUndefined()
  })

  it('should throw an error if syncTime is not a boolean', () => {
    var { result } = renderHook(() => usePhysColor({
      syncTime: 0
    }))

    const expected = Error('syncTime must be a boolean')
    expect(result.error).toEqual(expected)
  })
})

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
    const expected = [initialTimeStep]

    let output = result.current 
    expect(output).toEqual(expect.arrayContaining(expected))

    output = renderHook(() => usePhysColor({}))
    expect(output).toEqual(expect.not.arrayContaining(expected))
  })

  it('should return a style object with the same properties as the input style', () => {
    const inputStyle = {
      backgroundColor: ''
    }
    const { result } = renderHook(() => usePhysColor({style: inputStyle}))
    const [style] = result.current
    const properties = Object.getOwnPropertyNames(style)
    const inputProperties = Object.getOwnPropertyNames(inputStyle)
    console.log(result.error)
    
    expect(properties[0] === inputProperties[0]).toBeTruthy()
  })
})

