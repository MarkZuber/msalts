import { isInternalLink } from './main';

it("fail", () => {
    expect(1).toEqual(1);
});

test('should return false given external link', () => {
    expect(isInternalLink('https://google.com')).toBe(false);
});

test('should return true given internal link', () => {
    expect(isInternalLink('/some-page')).toBe(true);
});
