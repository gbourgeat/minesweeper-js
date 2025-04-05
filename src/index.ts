import { Minesweeper, MinesweeperConfig } from './minesweeper/minesweeper';
import './styles.css';

((document) => {
  let minesweeper: Minesweeper;

  document.getElementById('start-btn').addEventListener('click', () => {
    const width = (document.getElementById('width') as HTMLInputElement).value;
    const height = (document.getElementById('height') as HTMLInputElement).value;
    const difficulty = (document.getElementById('difficulty') as HTMLInputElement).value;

    const config: MinesweeperConfig = {
      containerId: 'minesweeper-container',
      gridDimensions: {
        height: parseInt(height),
        width: parseInt(width),
      },
      difficulty: parseInt(difficulty),
    };

    minesweeper = new Minesweeper(config);
    minesweeper.init();
  });
})(document);