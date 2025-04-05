import { Timer } from './timer';

export class TimerRenderer {
  constructor(
    private readonly timer: Timer,
    private readonly container: HTMLElement,
  ) {}

  render(): void {
    this.container.innerHTML = this.formatToMinutes(0);

    this.timer.handleTick((currentTime) => {
      this.container.innerHTML = this.formatToMinutes(currentTime);
    });
  }

  private formatToMinutes(remainingTime: number): string {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = Math.floor(remainingTime - (minutes * 60)).toString().padStart(2, '0');

    return `${minutes.toString().padStart(2, '0')}:${seconds}`;
  }
}