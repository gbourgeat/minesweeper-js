import { Cell } from './cell';
import { Position } from './position';
import resolveMinesweeperMatrix from './resolve-minesweeper-matrix';

export class GridGenerator {
  static generate(width: number, height: number, difficulty: number): Cell[] {
    const totalCellsCount = width * height;
    const minedCellCount = Math.floor(totalCellsCount / 100 * difficulty);
    const emptyCellCount = totalCellsCount - minedCellCount;

    const minedCellsChars = Array(minedCellCount).fill('*');
    const emptyCellsChars = Array(emptyCellCount).fill('.');
    const concatCellsChars = minedCellsChars.concat(emptyCellsChars);

    const shuffledCellsString = this.shuffle(concatCellsChars);
    const cellsStringRowChunked = this.chunk(shuffledCellsString, width);

    const matrixString = cellsStringRowChunked
      .map((lineChars) => lineChars.join(''))
      .join('\n');
    const resolvedMatrixString = resolveMinesweeperMatrix(matrixString);

    return this.parse(resolvedMatrixString);
  }

  private static shuffle(charsToShuffle: string[]): string[] {
    let currentIndex = charsToShuffle.length;

    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [charsToShuffle[currentIndex], charsToShuffle[randomIndex]] = [charsToShuffle[randomIndex], charsToShuffle[currentIndex]];
    }

    return charsToShuffle;
  }

  private static chunk(charsToChunk: string[], chunkSize: number): string[][] {
    const chunks= [];

    for (let i = 0; i < charsToChunk.length; i += chunkSize) {
      chunks.push(charsToChunk.slice(i, i + chunkSize));
    }

    return chunks;
  }

  private static parse(resolvedCellWithMineProximity: string): Cell[] {
    const cells = [];

    const lines = resolvedCellWithMineProximity.split('\n');
    for (const [yPosition, line] of lines.entries()) {
      const chars = line.split('');
      for (const [xPosition, char] of chars.entries()) {
        cells.push(Cell.create(char, Position.create(xPosition, yPosition)))
      }
    }

    return cells;
  }
}