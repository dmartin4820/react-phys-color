const sine = (t, params) => params.a * Math.sin(2 * Math.PI * params.freq * t) + params.offset
const exp = (t, params) => params.a * Math.exp(params.b* t) + params.c
const getFunction = (name) => {
  switch(name) {
    case 'sine':
      return sine
    case 'exp':
      return exp
    default:
      return sine
  }
}
const getCurrValue = (f, t, params) => {
  return f(t, params)
}

export {
  sine,
  exp,
  getFunction,
  getCurrValue
}
