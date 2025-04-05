import { Grid } from './grid';

export class FlagRemainderRenderer {
  constructor(
    private readonly grid: Grid,
    private readonly container: HTMLElement,
  ) {}

  render(): void {
    this.container.innerHTML = '⚚ ' + this.grid.remainingFlag();

    this.grid.handleFlag(() => {
      this.container.innerHTML = '⚚ ' + this.grid.remainingFlag();
    });
  }
}