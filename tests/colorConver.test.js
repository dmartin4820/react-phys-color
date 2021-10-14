import { hexToRGB, checkColorType } from "../utils/colorConvert";

describe('checkColorType Output', () => {
  it ('should return rgb when given an rgb value', () => {
    const result = checkColorType('rgb(13, 132, 12)');
    const resultWithOpacity = checkColorType('rgb(13, 132, 12, 13)');
    const expected = 'rgb';
    expect(expected).toEqual(result);
    expect(expected).toEqual(resultWithOpacity);
  });
  it('should return hex when given a hex value', () => {
    const result = checkColorType('#AF2000');
    const resultWithOpacity = checkColorType('#AF20FA20');
    const expected = 'hex';
    expect(expected).toEqual(result);
    expect(expected).toEqual(resultWithOpacity);
  });
  it('should return an error if given the a bad input', () => {
    const error = 'Color value is not hex or rgb value. Ensure spaces between values in rgb (e.g. "rgb(13, 142, 12)")'
    expect(() => {
      checkColorType(12);
      checkColorType({});
      checkColorType('rgb(13,142,12)');
    }).toThrow(error)
  });
})

describe('hexToRGBA Output', () => {
  it('should return an object', () => {
    const result = hexToRGB('#000000')
    expect(typeof result === 'object');
  });

  it('should return the correct rgba values when given a hex input', () => {
    const expected = {r: 66, g: 50, b: 168, a:0.42};
    const result = hexToRGB('#4232a842');
    expect(expected).toStrictEqual(result);
  });

  it('should throw if given an incorrect input', () => {
    const error = "Input must be in hex format (e.g.: '#15ff00')"
    expect(() => {
      hexToRGB('abcd');
      hexToRGB(123);
      hexToRGB('#0000');
    }).toThrow(error);
  });
});