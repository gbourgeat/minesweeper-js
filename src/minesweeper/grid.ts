import { Cell } from './cell';
import { GridGenerator } from './grid-generator';

export class Grid {
  private _onLooseCallback: () => void = () => {};
  private _onWinCallback: () => void = () => {};
  private _onFlagCallback: () => void = () => {};
  private _onStartCallback: () => void = () => {};

  private _started: boolean = false;
  private _loose: boolean = false;

  private _discoveredCounter: number = 0;
  private _flagCounter: number = 0;

  private constructor(
    private readonly _cells: Cell[],
    private readonly _minesCount: number,
  ) {}

  static create(width: number, height: number, difficulty: number): Grid {
    const cells = GridGenerator.generate(width, height, difficulty);
    const countOfMines = cells
      .reduce((previousValue, currentValue) => previousValue + (currentValue.isMined() ? 1 : 0), 0);

    return new Grid(cells, countOfMines);
  }

  cells(): Cell[] {
    return this._cells;
  }

  remainingFlag(): number {
    const remainingFlag = this._minesCount - this._flagCounter;

    return remainingFlag >= 0 ? remainingFlag : 0;
  }

  discover(cell: Cell): void {
    if (this._loose || cell.isFlagged() || cell.isDiscovered()) {
      return;
    }

    if (!this._started) {
      this._started = true;
      this.onStart();
    }

    cell.discover();
    this._discoveredCounter++;
    if (cell.isMined()) {
      return this.onLoose();
    }

    if (!cell.isFlagged() && !cell.numberOfAdjacentMines()) {
      this.revealEmptyAdjacentCells(cell);
    }

    const remainingCells = this._cells.length - (this._discoveredCounter + this._flagCounter);
    if (remainingCells === 0) {
      return this.onWin();
    }
  }

  private revealEmptyAdjacentCells(cell: Cell): void {
    const adjacentUndiscoveredCells = this.findAdjacentCells(cell)
      .filter((cell: Cell) => !cell.isDiscovered());

    adjacentUndiscoveredCells.forEach((cell: Cell) => {
      this.discover(cell);
    });
  }

  private findAdjacentCells(cell: Cell): Cell[] {
    return this.cells().filter((cellItem: Cell) => cell.isAdjacent(cellItem));
  }

  flag(cell: Cell): void {
    if (this._loose || cell.isDiscovered()) {
      return;
    }

    cell.toggleFlag();

    (cell.isFlagged())
      ? this._flagCounter++
      : this._flagCounter--;

    this.onFlag();

    const remainingCells = this._cells.length - (this._discoveredCounter + this._flagCounter);
    if (remainingCells === 0) {
      return this.onWin();
    }
  }

  handleLoose(callback: () => void): void {
    this._onLooseCallback = callback;
  }

  onLoose(): void {
    this._loose = true;
    this.revealMines();
    this.revealFlags();

    this._onLooseCallback();
  }

  private revealMines(): void {
    this.cells()
      .filter((cell: Cell) => !cell.isDiscovered() && cell.isMined())
      .forEach((cell: Cell) => cell.discover())
  }

  private revealFlags(): void {
    this.cells()
      .filter((cell: Cell) => !cell.isDiscovered() && cell.isFlagged())
      .forEach((cell: Cell) => cell.discover())
  }

  handleWin(callback: () => void): void {
    this._onWinCallback = callback;
  }

  onWin(): void {
    this.revealFlags();
    this._onWinCallback();
  }

  handleFlag(callback: () => void): void {
    this._onFlagCallback = callback;
  }

  onFlag(): void {
    this._onFlagCallback();
  }

  handleStart(callback: () => void): void {
    this._onStartCallback = callback;
  }

  onStart(): void {
    this._onStartCallback();
  }
}