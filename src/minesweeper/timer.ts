export class Timer {
  private intervalId: NodeJS.Timeout | null = null;
  private tickCallback: ((currentTime: number) => void) = () => {};
  private duration: number;

  start(): void {
    if (this.intervalId !== null) {
      return;
    }

    const startTime = new Date().getTime();
    this.duration = 0;

    this.intervalId = setInterval(() => {
      const currentTime = new Date().getTime();
      this.duration = Math.floor((currentTime - startTime) / 1000);
      this.tickCallback(this.duration);
    }, 100);
  }

  stop(): void {
    if (!this.intervalId) {
      return;
    }

    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  handleTick(callback: (currentDuration: number) => void): void {
    this.tickCallback = callback;
  }
}