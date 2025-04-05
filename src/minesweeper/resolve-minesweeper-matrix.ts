function getPreviousLine(currentLineIndex: number, matrix: string[][]): string[] | null {
  return !currentLineIndex ? null : matrix[currentLineIndex - 1];
}

function getNextLine(currentLineIndex: number, matrix: string[][]): string[] | null {
  return currentLineIndex === (matrix.length - 1) ? null : matrix[currentLineIndex + 1];
}

function countOfAdjacentMinesForLine(lineChars: string[], position: number): number {
  const hasMineAtPosition = isMine(lineChars[position]);
  const hasMineAtPreviousPosition = position > 0 && isMine(lineChars[position - 1]);
  const hasMineAtNextPosition = position < lineChars.length && isMine(lineChars[position + 1]);

  return [hasMineAtPosition, hasMineAtPreviousPosition, hasMineAtNextPosition]
    .reduce((total: number, currentValue: boolean) => total + (currentValue ? 1 : 0), 0);
}

function countOfAdjacentMinesForPosition(matrix: string[][], yPosition: number, xPosition: number): number {
  let minesCounter = 0;

  const line = matrix[yPosition];

  const previousLine = getPreviousLine(yPosition, matrix);
  if (previousLine) {
    minesCounter += countOfAdjacentMinesForLine(previousLine, xPosition);
  }

  const nextLine = getNextLine(yPosition, matrix);
  if (nextLine) {
    minesCounter += countOfAdjacentMinesForLine(nextLine, xPosition);
  }

  minesCounter += countOfAdjacentMinesForLine(line, xPosition);

  return minesCounter;
}

const isMine = (char: string): boolean => char === '*';

export default function resolveMinesweeperMatrix(matrix: string): string {
  const lines = matrix
    .split('\n')
    .map(line => line.split(''));

  return lines.map((line, yPosition) => {
    return line.map((char, xPosition) => {
      if (isMine(char)) {
        return '*';
      }

      return countOfAdjacentMinesForPosition(lines, yPosition, xPosition);
    }).join('');
  }).join('\n');
}