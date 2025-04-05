import { describe, expect, it } from 'vitest';
import { GridRenderer } from './grid-renderer';
import { Grid } from './grid';

describe('GridRenderer', () => {
  it('should convert matrice of one cell', () => {
    const elementContainer = document.createElement('div');
    const grid = Grid.create(1, 1, 1);

    const matriceToHtmlConverter = new GridRenderer(grid, elementContainer);
    matriceToHtmlConverter.render();

    const result = elementContainer.innerHTML;

    const resultExpected = `<div class="matrice"><div class="row" id="row-0"><div class="cell cell-undiscovered" data-x="0" data-y="0" id="cell-0-0"></div></div></div>`;
    expect(result).toBe(resultExpected);
  });

  it('should convert matrice of 2 cells', () => {
    const elementContainer = document.createElement('div');
    const grid = Grid.create(2, 1, 1);

    const matriceToHtmlConverter = new GridRenderer(grid, elementContainer);
    matriceToHtmlConverter.render();

    const result = elementContainer.innerHTML;

    const resultExpected = `<div class="matrice"><div class="row" id="row-0"><div class="cell cell-undiscovered" data-x="0" data-y="0" id="cell-0-0"></div><div class="cell cell-undiscovered" data-x="1" data-y="0" id="cell-1-0"></div></div></div>`;
    expect(result).toBe(resultExpected);
  });
});