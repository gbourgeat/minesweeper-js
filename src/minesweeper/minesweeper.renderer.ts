import { GridRenderer } from './grid-renderer';
import { TimerRenderer } from './timer-renderer';
import { RemainingFlagRenderer } from './remaining-flag-renderer';
import { Grid } from './grid';
import { Timer } from './timer';
import { v } from 'vitest/dist/chunks/reporters.d.CfRkRKN2';

export class MinesweeperRenderer {
  constructor(
    private readonly containerId: string,
    private readonly grid: Grid,
    private readonly timer: Timer,
  ) {
  }

  render(): void {
    const containerHTMLElement = document.getElementById(this.containerId);
    this.clearContainer(containerHTMLElement);
    containerHTMLElement.classList.add('minesweeper-container');

    const gridHTMLElement = this.createGridHTMLElement(containerHTMLElement);
    const gridRenderer = new GridRenderer(this.grid, gridHTMLElement);

    const timerHTMLElement = this.createTimerHTMLElement(containerHTMLElement);
    const timerRenderer = new TimerRenderer(this.timer, timerHTMLElement);

    const flagsHTMLElement = this.createFlagRemainderHTMLElement(containerHTMLElement);
    const flagRenderer = new RemainingFlagRenderer(this.grid, flagsHTMLElement);

    timerRenderer.render();
    flagRenderer.render();
    gridRenderer.render();
  }

  private clearContainer(container: HTMLElement): void {
    if (container.children.length) {
      while (container.children.length) {
        container.removeChild(container.firstChild);
      }
    }
  }

  private createTimerHTMLElement(container: HTMLElement): HTMLElement {
    const timerHTMLElement = document.createElement('div');
    timerHTMLElement.id = 'minesweeper-timer';
    timerHTMLElement.classList.add('timer');
    container.prepend(timerHTMLElement);

    return timerHTMLElement;
  }

  private createFlagRemainderHTMLElement(container: HTMLElement): HTMLElement {
    const flagRemainderHTMLElement = document.createElement('div');
    flagRemainderHTMLElement.id = 'minesweeper-flags';
    flagRemainderHTMLElement.classList.add('flags');
    container.prepend(flagRemainderHTMLElement);

    return flagRemainderHTMLElement;
  }

  private createGridHTMLElement(container: HTMLElement): HTMLElement {
    const gridHTMLElement = document.createElement('div');
    gridHTMLElement.id = 'minesweeper-grid';
    gridHTMLElement.classList.add('grid');
    container.append(gridHTMLElement);

    return gridHTMLElement;
  }
}