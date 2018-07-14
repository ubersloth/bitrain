const consts = {
  AUTH: 'auth'
}

const capitalize = (s) => {
  if (!s || s.length < 1) return s
  return s[0].toUpperCase() + s.substr(1)
}

const sortingFunctions = {
  string: (a, b) => a.localeCompare(b),
  numeric: (a, b) => a - b,
  time: (a, b) => new Date(a) - new Date(b)
}

export { consts, capitalize, sortingFunctions }
