import { describe, it, expect, beforeEach } from 'vitest';
import { TimerRenderer } from './timer-renderer';
import { Timer } from './timer';

describe('TimerRenderer', () => {
  let timer: Timer;
  let container: HTMLElement;
  let timerRenderer: TimerRenderer;

  beforeEach(() => {
    container = document.createElement('div');

    timer = new Timer();
    timerRenderer = new TimerRenderer(timer, container);
  });

  describe('render', () => {
    it('should init with time 00:00', () => {
      timerRenderer.render();

      expect(container.innerHTML).toBe('00:00');
    });

    it('should rerender on timer tick', () => {
      timerRenderer.render();

      timer.start();
      setTimeout(() => {
        expect(container.innerHTML).toBe('00:01');
      }, 1000);
    });
  });
});