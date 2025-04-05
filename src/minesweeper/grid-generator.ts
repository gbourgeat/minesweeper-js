import { Cell } from './cell';
import { Position } from './position';

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

    const stringMatriceWithMines = cellsStringRowChunked
      .map((lineChars) => lineChars.join(''))
      .join('\n');
    const stringMatriceWithMinesCount = addAdjacentMineCount(stringMatriceWithMines);

    return this.parse(stringMatriceWithMinesCount);
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

function getPreviousLine(currentLineIndex: number, matrice: string[][]): string[] | null {
  return !currentLineIndex ? null : matrice[currentLineIndex - 1];
}

function getNextLine(currentLineIndex: number, matrice: string[][]): string[] | null {
  return currentLineIndex === (matrice.length - 1) ? null : matrice[currentLineIndex + 1];
}

function countOfAdjacentMinesForLine(matriceLine: string[], position: number) {
  const hasMineAtPosition = isMine(matriceLine[position]);
  const hasMineAtPreviousPosition = position > 0 && isMine(matriceLine[position - 1]);
  const hasMineAtNextPosition = position < matriceLine.length && isMine(matriceLine[position + 1]);

  return [hasMineAtPosition, hasMineAtPreviousPosition, hasMineAtNextPosition]
    .reduce((total: number, currentValue: boolean) => total + (currentValue ? 1 : 0), 0);
}

function countOfAdjacentMinesForPosition(matrice: string[][], yPosition: number, xPosition: number) {
  let minesCounter = 0;

  const line = matrice[yPosition];

  const previousLine = getPreviousLine(yPosition, matrice);
  if (previousLine) {
    minesCounter += countOfAdjacentMinesForLine(previousLine, xPosition);
  }

  const nextLine = getNextLine(yPosition, matrice);
  if (nextLine) {
    minesCounter += countOfAdjacentMinesForLine(nextLine, xPosition);
  }

  minesCounter += countOfAdjacentMinesForLine(line, xPosition);

  return minesCounter;
}

const isMine = (char: string) => char === '*';

function addAdjacentMineCount(entry: string) {
  const lines = entry.split('\n');
  const matrice = lines.map(line => line.split(''));

  return matrice.map((line, yPosition) => {
    return line.map((char, xPosition) => {
      if (isMine(char)) {
        return '*';
      }

      return countOfAdjacentMinesForPosition(matrice, yPosition, xPosition);
    }).join('');
  }).join('\n');
}