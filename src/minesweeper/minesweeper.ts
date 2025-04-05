import { Grid } from './grid';
import { Timer } from './timer';
import { MinesweeperRenderer } from './minesweeper.renderer';

export type MinesweeperConfig = {
  containerId: string,
  gridDimensions: {
    width: number;
    height: number;
  },
  difficulty: number,
};

export class Minesweeper {
  private timer: Timer;

  private _handleStartCallback = (): void => {};
  private _handleWinCallback = (): void => {};
  private _handleLooseCallback = (): void => {};

  constructor(private readonly config: MinesweeperConfig) {}

  init(): void {
    const gridDimensions = this.config.gridDimensions;
    const grid = Grid.create(
      gridDimensions.width,
      gridDimensions.height,
      this.config.difficulty,
    );

    this.timer = new Timer();

    const minesweeperRenderer = new MinesweeperRenderer(this.config.containerId, grid, this.timer);
    minesweeperRenderer.render();

    grid.handleStart(() => {
      this.timer.start();
      this._handleStartCallback();
    });

    grid.handleWin(() => {
      this.timer.stop();
      this._handleWinCallback();
    });

    grid.handleLoose(() => {
      this.timer.stop();
      this._handleLooseCallback();
    });
  }
}
