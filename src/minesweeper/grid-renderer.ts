import { Cell } from './cell';
import { Grid } from './grid';

export class GridRenderer {
  private cells: Cell[];

  constructor(
    private readonly grid: Grid,
    private readonly container: HTMLElement,
  ) {}

  render(): void {
    this.cells = this.grid.cells();

    const maxX = Math.max(...this.cells.map((cell: Cell) => cell.position().x()));
    const divMatrice = this.createMatriceHTMLElement();

    let rowIndex = 0;
    let rowHTMLElement = this.createRowHTMLElement(rowIndex++);
    for (const [cellIndex, cell] of this.cells.entries()) {
      rowHTMLElement.appendChild(this.createCellHTMLElement(cell));

      if (cell.position().x() === maxX) {
        divMatrice.appendChild(rowHTMLElement);

        if (cellIndex !== (this.cells.length - 1)) {
          rowHTMLElement = this.createRowHTMLElement(rowIndex++);
        }
      }
    }

    this.clearContainer();
    this.container.appendChild(divMatrice);
  }

  private clearContainer(): void {
    if (this.container.firstChild) {
      this.container.firstChild.remove();
    }
  }

  private createMatriceHTMLElement(): HTMLElement {
    const div = document.createElement('div');
    div.classList.add('cells');

    return div;
  }

  private createRowHTMLElement(indexRow: number): HTMLElement {
    const div = document.createElement('div');
    div.classList.add('row');
    div.id = `row-${indexRow}`;

    return div;
  }

  private createCellHTMLElement(cell: Cell): HTMLElement {
    const cellHTMLElement = document.createElement('div');
    cellHTMLElement.classList.add('cell');
    cellHTMLElement.dataset.x = cell.position().x().toString();
    cellHTMLElement.dataset.y = cell.position().y().toString();
    cellHTMLElement.id = `cell-${cell.position().x()}-${cell.position().y()}`;

    if (cell.isFlagged()) {
      cellHTMLElement.classList.add('cell-flagged')
    }

    if (!cell.isDiscovered()) {
      cellHTMLElement.classList.add('cell-undiscovered');
    } else {
      cellHTMLElement.classList.add('cell-discovered');

      if (cell.isMined()) {
        cellHTMLElement.classList.add('cell-mined');
      } else {
        cellHTMLElement.classList.add('cell-empty');
        cellHTMLElement.dataset.countMines = cell.numberOfAdjacentMines().toString();
      }
    }

    if (!cell.isDiscovered()) {
      cellHTMLElement.addEventListener('click', (clickEvent: Event) => {
        clickEvent.preventDefault();

        this.grid.discover(cell);

        this.render();
      });

      cellHTMLElement.addEventListener('contextmenu', (clickEvent: Event) => {
        clickEvent.preventDefault();

        this.grid.flag(cell);

        this.render();
      });
    }

    return cellHTMLElement;
  }
}