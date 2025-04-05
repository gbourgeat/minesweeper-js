import { Position } from './position';

export class Cell {
  private _isDiscovered = false;
  private _isMine = false;
  private _isFlagged = false;
  private _numberOfAdjacentMines = 0;

  private constructor(public readonly char: string, public readonly _position: Position) {
    if (char === '*') {
      this._isMine = true;
    } else {
      this._numberOfAdjacentMines = parseInt(char, 10);
    }
  }

  static create(char: string, position: Position): Cell {
    return new Cell(char, position);
  }

  discover(): void {
    this._isDiscovered = true;
  }

  toggleFlag(): void {
    this._isFlagged = !this._isFlagged;
  }

  isFlagged(): boolean {
    return this._isFlagged;
  }

  isDiscovered(): boolean {
    return this._isDiscovered;
  }

  position(): Position {
    return this._position;
  }

  isMined(): boolean {
    return this._isMine;
  }

  numberOfAdjacentMines(): number {
    return this._numberOfAdjacentMines;
  }

  isAdjacent(cell: Cell): boolean {
    return this.position().adjacent(cell.position());
  }
}