import { hexToRGB } from "../utils/colorConvert";

describe('Output', () => {
  it('should return an object', () => {
    const result = hexToRGB('#000000')
    expect(typeof result === 'object');
  });

  it('should return the correct rgba values when given a hex input', () => {
    const expected = {r: 66, g: 50, b: 168, a:0.42};
    const result = hexToRGB('#4232a842');
    expect(expected).toMatchObject(result);
  });

  it('should throw if given an incorrect input', () => {
    expect(() => {
      hexToRGB('abcd');
    }).toThrow("Input must be in hex format (e.g.: '#15ff00')")
    expect(() => {
      hexToRGB(123);
    }).toThrow("Input must be in hex format (e.g.: '#15ff00')")
    expect(() => {
      hexToRGB('#0000');
    }).toThrow("Input must be in hex format (e.g.: '#15ff00')")
  })
})