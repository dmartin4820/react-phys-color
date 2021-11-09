const setupFunction = (options, func) => {
  let output
  switch(func.fname) { //Switch in case there are more functions than 2
    case 'sine':
      output = setupSine(options.from, options.to, options.freq)
      break
    case 'exp':
      output = setupExp(options.from, options.to)
      break
    default:
      break
  }
  return output
}


function setupSine(from, to, freq) {
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
    }
  }
}

export { setupFunction }