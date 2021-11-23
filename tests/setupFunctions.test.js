import { setupFunction, setupSine, setupExp, getFunction } from '../src/utils'

describe('setupSine errors', () => {
  const baseArr = new Array(10)
   
  const from = []
  const to = []
  for (let i = 0; i < baseArr.length; i++) {
    from.push(10 * i)
    to.push(100 - 10 * i)
  }

  const isGreaterThanTo = from.map((_, i) => to[i] < from[i])
  const error = new Error('`from` must be less than `to`')  
  it ('should throw an error when `from` is greater than `to`', () => {
    for (let i = 0; i < from.length; i++) {
      isGreaterThanTo[i] 
        ? expect(() => { setupSine(from[i], to[i], 0) }).toThrow(error)
        : false
    }
  })

  it ('should not throw an error when `from` is less than `to`', () => {
    for (let i = 0; i < from.length; i++) {
      !isGreaterThanTo[i] 
        ? expect(() => { setupSine(from[i], to[i], 0) }).not.toThrow(error)
        : false
    }  
  })
})

describe('setupExp errors', () => {
  it('should throw an error if `from` or `to` are not greater or equal to 0', () => {
    const error = new Error('Invalid values for `from` and/or `to`')
    expect(() => { setupExp(-1, -1, {}) }).toThrow(error)
    expect(() => { setupExp(-1, 0, {}) }).toThrow(error)
    expect(() => { setupExp(0, -1, {}) }).toThrow(error)
  })
  it('should throw an error if b not specified', () => {
    const error = new Error('Parameter b must be specified for exponential function')
    expect(() => { setupExp(255, 0, {}) }).toThrow(error)
  })
  it('should return an object with appropriate output from given input', () => {
    const expected = {
      fname: 'exp',
      params: {
        a: 255,
        b: -0.001,
        c: 0
      },
      f: getFunction('exp')
    }
    expect(setupExp(255, 0, { b:-0.001 })).toEqual(expected)        
  })
})