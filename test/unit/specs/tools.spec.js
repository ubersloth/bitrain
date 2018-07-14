import { capitalize, ipToInt, sortingFunctions } from '@/shared/tools'

// capitalize
it('Ignores empty strings', ()=> {
  expect(capitalize('')).toBe('')
})

it('Ignores undefined strings', ()=> {
  expect(capitalize(undefined)).toBe(undefined)
})

it('Capitalizes single letter strings', ()=> {
  expect(capitalize('a')).toBe('A')
})

it('Capitalizes first letter', ()=> {
  expect(capitalize('hello')).toBe('Hello')
})

it('Capitalizes first letter', ()=> {
  expect(capitalize('hELLO')).toBe('HELLO')
})

// ipToInt
it('Correctly converts 1.1.1.1', ()=> {
  expect(ipToInt("1.1.1.1")).toBe(16843009)
})

it('Correctly converts 2.3.4.5', ()=> {
  expect(ipToInt("2.3.4.5")).toBe(33752069)
})

it('Ignores superflous octets (2.3.4.5.6)', ()=> {
  expect(ipToInt("2.3.4.5.6")).toBe(33752069)
})

// sortingFunctions.string
it('Identifies string order a < b', ()=> {
  expect(sortingFunctions.string("a", "b")).toBe(-1)
})

it('Identifies string order b > a', ()=> {
  expect(sortingFunctions.string("b", "a")).toBe(1)
})

it('Identifies string order a == a', ()=> {
  expect(sortingFunctions.string("a", "a")).toBe(0)
})

it('Is case insensitive', ()=> {
  expect(sortingFunctions.string("a", "B")).toBe(-1)
})

it('Is case insensitive', ()=> {
  expect(sortingFunctions.string("A", "b")).toBe(-1)
})

it('Uses dictionary order', ()=> {
  expect(sortingFunctions.string("10", "2")).toBe(-1)
})

// sortingFunctions.ip
it('Uses numeric ordering', ()=> {
  expect(sortingFunctions.ip("2.2.2.2", "100.2.2.2")).toBeLessThan(0)
})

it('Uses numeric ordering', ()=> {
  expect(sortingFunctions.ip("2.2.2.4", "2.2.2.3")).toBeGreaterThan(0)
})

it('Uses numeric ordering', ()=> {
  expect(sortingFunctions.ip("2.2.2.4", "2.2.2.4")).toBe(0)
})