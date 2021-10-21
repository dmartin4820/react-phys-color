exports.sine = (t, params) => params.a * Math.sin(2 * Math.PI * params.freq * t) + params.offset
exports.exp = (t, params) => params.a * Math.exp(params.b* t) + params.c
exports.getFunction = (name) => {
  switch(name) {
    case 'sine':
      return this.sine
    case 'exp':
      return this.exp
    default:
      return this.sine
  }
}
exports.getCurrValue = (f, t, params) => {
  return f(t, params)
}
