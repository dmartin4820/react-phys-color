import { setupFunction, setupSine } from '../utils'

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