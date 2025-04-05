import { Minesweeper, MinesweeperConfig } from './minesweeper/minesweeper';
import './styles/styles.scss';

((document: Document) => {
  let minesweeper: Minesweeper;

  function initMinesweeper() {
    minesweeper = new Minesweeper(minesweeperConfig());
    minesweeper.init();
  }

  function minesweeperConfig(): MinesweeperConfig {
    const width = inputValueOf('input-width');
    const height = inputValueOf('input-height');
    const difficulty = inputValueOf('input-difficulty');

    return {
      containerId: 'minesweeper-container',
      gridDimensions: {
        height: parseInt(height),
        width: parseInt(width),
      },
      difficulty: parseInt(difficulty),
    };
  }

  document.getElementById('button-start')
    .addEventListener('click', initMinesweeper);

  initMinesweeper();
})(document);

function inputValueOf(elementId: string): string {
  return (document.getElementById(elementId) as HTMLInputElement).value;
}