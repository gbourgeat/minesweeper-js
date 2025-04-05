import { describe, expect, test } from 'vitest';
import resolveMinesweeperMatrix from './resolve-minesweeper-matrix';

describe('resolveMinesweeperMatrix', () => {
  test('without mine on 1 line', () => {
    const entry = `....`;

    const expectedResult = `0000`;

    const result = resolveMinesweeperMatrix(entry);

    expect(result).toBe(expectedResult);
  });

  test('with 1 mine on first char on 1 line', () => {
    const entry = `*...`;

    const expectedResult = `*100`;

    const result = resolveMinesweeperMatrix(entry);

    expect(result).toBe(expectedResult);
  });

  test('with 1 mine on middle of 1 line', () => {
    const entry = `.*..`;

    const expectedResult = `1*10`;

    const result = resolveMinesweeperMatrix(entry);

    expect(result).toBe(expectedResult);
  });

  test('with 2 mine on middle separated of 1 line', () => {
    const entry = `.*.*.`;

    const expectedResult = `1*2*1`;

    const result = resolveMinesweeperMatrix(entry);

    expect(result).toBe(expectedResult);
  });

  test('with 1 mine on top middle line of 2 lines', () => {
    const entry = `..*..
.....`;

    const expectedResult = `01*10
01110`;

    const result = resolveMinesweeperMatrix(entry);

    expect(result).toBe(expectedResult);
  });

  test('with 1 mine on middle of 3 lines', () => {
    const entry = `.....
..*..
.....`;

    const expectedResult = `01110
01*10
01110`;

    const result = resolveMinesweeperMatrix(entry);

    expect(result).toBe(expectedResult);
  });

  test('with 2 mine on middle of 3 lines', () => {
    const entry = `......
..**..
......`;

    const expectedResult = `012210
01**10
012210`;

    const result = resolveMinesweeperMatrix(entry);

    expect(result).toBe(expectedResult);
  });

  test('with 2 mine on middle of 3 lines and one at end of last line', () => {
    const entry = `......
..**..
.....*`;

    const expectedResult = `012210
01**21
01222*`;

    const result = resolveMinesweeperMatrix(entry);

    expect(result).toBe(expectedResult);
  });

  test('with acceptance input 1', () => {
    const entry = `*...
....
.*..
....`;

    const expectedResult = `*100
2210
1*10
1110`;

    const result = resolveMinesweeperMatrix(entry);

    expect(result).toBe(expectedResult);
  });

  test('with acceptance input 2', () => {
    const entry = `**...
.....
.*...`;

    const expectedResult = `**100
33200
1*100`;

    const result = resolveMinesweeperMatrix(entry);

    expect(result).toBe(expectedResult);
  });
});