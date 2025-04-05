export class Position {
  private constructor(private readonly _x: number, private readonly _y: number) {}

  static create(x: number, y: number) {
    return new Position(x, y);
  }

  x(): number {
    return this._x;
  }

  y(): number {
    return this._y;
  }

  adjacent(position: Position): boolean {
    if (this.y() === position.y()) {
      return Math.abs(position.x() - this.x()) === 1;
    } else if (Math.abs(position.y() - this.y()) === 1) {
      return [0, 1].includes(Math.abs(position.x() - this.x()));
    }

    return false;
  }

  equals(position: Position): boolean {
    return position.x() === this.x() && position.y() === this.y();
  }
}