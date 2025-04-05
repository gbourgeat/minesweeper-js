import { describe, expect, it } from 'vitest';
import { Position } from './position';

describe('Position', () => {
  it('should be create', () => {
    const position = Position.create(14, 25);

    expect(position.x()).toBe(14);
    expect(position.y()).toBe(25);
  });

  it('should return true if equals', () => {
    const positionA = Position.create(14, 25);
    const positionB = Position.create(14, 25);

    expect(positionA.equals(positionB)).toBeTruthy();
    expect(positionB.equals(positionA)).toBeTruthy();
  });

  it('should return false if not equals', () => {
    const positionA = Position.create(14, 24);
    const positionB = Position.create(13, 25);

    expect(positionA.equals(positionB)).toBeFalsy();
    expect(positionB.equals(positionA)).toBeFalsy();
  });

  it('should return true if adjacent on same line', () => {
    const positionA = Position.create(13, 25);
    const positionB = Position.create(14, 25);

    expect(positionA.adjacent(positionB)).toBeTruthy();
    expect(positionB.adjacent(positionA)).toBeTruthy();
  });

  it('should return false if not adjacent on same line', () => {
    const positionA = Position.create(12, 25);
    const positionB = Position.create(14, 25);

    expect(positionA.adjacent(positionB)).toBeFalsy();
    expect(positionB.adjacent(positionA)).toBeFalsy();
  });

  it.each([
    [
      [13, 15],
      [13, 16],
    ],
    [
      [14, 15],
      [13, 16],
    ],
    [
      [12, 15],
      [13, 16],
    ],
  ])('should return true if adjacent on adjacent line', (positionA: number[], positionB: number[]) => {
    const pA = Position.create(positionA[0], positionA[1]);
    const pB = Position.create(positionB[0], positionB[1]);

    expect(pA.adjacent(pB)).toBeTruthy();
    expect(pB.adjacent(pA)).toBeTruthy();
  });

  it.each([
    [
      [10, 15],
      [12, 16],
    ],
    [
      [15, 15],
      [12, 16],
    ],
    [
      [10, 15],
      [12, 16],
    ],
  ])('should return false if not adjacent on adjacent line', (positionA: number[], positionB: number[]) => {
    const pA = Position.create(positionA[0], positionA[1]);
    const pB = Position.create(positionB[0], positionB[1]);

    expect(pA.adjacent(pB)).toBeFalsy();
    expect(pB.adjacent(pA)).toBeFalsy();
  });
});