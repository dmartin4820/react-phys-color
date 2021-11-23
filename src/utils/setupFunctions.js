import { getFunction } from "."

const setupFunction = (options, func) => {
  let output
  switch(func.fname) { //Switch in case there are more functions than 2
    case 'sine':
      output = setupSine(options.from, options.to, options.freq)
      break
    case 'exp':
      output = setupExp(options.from, options.to, func.params)
      break
    default:
      break
  }
  return output
}


const setupSine = (from, to, freq) => {
  if (from > to) {
    throw Error('`from` must be less than `to`')
  }

  if (typeof from !== 'number' || typeof to !== 'number') {
    throw Error(' `from` and `to` must be of type number')
  }

  const offset = (to + from) / 2
  const a = to - offset
  return {
    fname: 'sine',
    params: {
      a,
      freq,
      offset
    },
    f: getFunction('sine')
  }
}

//b>0 not allowed, a<0 not allowed, c<0 not allowed 
const setupExp = (from, to, params) => {
  if (from < 0 || to < 0) {
    throw Error('Invalid values for `from` and/or `to`')
  }
  if (params.b === undefined) {
    throw Error ('Parameter b must be specified for exponential function')
  }
  //Will remove this to allow for exponential growth
  if (params.b > 0) {
    throw Error('Invalid values for b')
  }

  return {
    fname: 'exp',
    params: {
      a: from,
      b: params.b,
      c: to
    }, 
    f: getFunction('exp')
  }
}

export { setupFunction, setupSine, setupExp }