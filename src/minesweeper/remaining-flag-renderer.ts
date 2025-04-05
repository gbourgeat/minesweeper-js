import { Grid } from './grid';

export class RemainingFlagRenderer {
  constructor(
    private readonly grid: Grid,
    private readonly container: HTMLElement,
  ) {}

  render(): void {
    this.container.innerHTML = 'Remaining flag : ' + this.grid.remainingFlag();

    this.grid.handleFlag(() => {
      this.container.innerHTML = 'Remaining flag : ' + this.grid.remainingFlag();
    });
  }
}