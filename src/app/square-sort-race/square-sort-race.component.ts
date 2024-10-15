import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  inject,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { SquareComponent } from './square/square.component';
import { Random } from 'random';
import {
  INITIAL_BOARD,
  MoveDirection,
  SQUARE_COLOR_CLASS,
  SquareColor,
} from './square-sort-race';

@Component({
  selector: 'app-square-sort-race',
  templateUrl: './square-sort-race.component.html',
  styleUrl: './square-sort-race.component.css',
  animations: [],
})
export class SquareSortRaceComponent implements AfterViewInit {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private isPlaying = false;
  private isMoving = false;
  private random: Random = new Random('adc');
  protected target = [
    SquareColor.BLUE,
    SquareColor.BLUE,
    SquareColor.BLUE,
    SquareColor.BLUE,
    SquareColor.CYAN,
    SquareColor.CYAN,
    SquareColor.CYAN,
    SquareColor.CYAN,
    SquareColor.GREEN,
    SquareColor.GREEN,
    SquareColor.GREEN,
    SquareColor.GREEN,
    SquareColor.MAGENTA,
    SquareColor.MAGENTA,
    SquareColor.MAGENTA,
    SquareColor.MAGENTA,
    SquareColor.RED,
    SquareColor.RED,
    SquareColor.RED,
    SquareColor.RED,
    SquareColor.YELLOW,
    SquareColor.YELLOW,
    SquareColor.YELLOW,
    SquareColor.YELLOW,
  ]
    .sort(() => this.random.next() - 0.5)
    .slice(0, 9);

  private boardContainer =
    viewChild.required<ElementRef<HTMLDivElement>>('boardContainer');
  private targetContainer =
    viewChild.required<ElementRef<HTMLDivElement>>('targetContainer');

  private boardRef = viewChild.required('board', { read: ViewContainerRef });
  private squares: SquareComponent[] = [];
  private emptySquare = -1;

  protected mapColorToClass = SQUARE_COLOR_CLASS;

  showStartMessage = true;

  @HostListener('window:keydown', ['$event'])
  private handleKeyDown(event: KeyboardEvent) {
    if (this.isMoving || !this.isPlaying) {
      return;
    }
    const mapKeyToDirection: {
      [key: string]: MoveDirection;
    } = {
      ArrowUp: 'up',
      ArrowDown: 'down',
      ArrowLeft: 'left',
      ArrowRight: 'right',
    };
    const direction = mapKeyToDirection[event.key];
    if (!direction) {
      return;
    }
    if (this.canMoveDirection(direction)) {
      this.move(direction).then(() => {
        this.checkWin();
      });
    }
  }

  ngAfterViewInit(): void {
    const initialOrder = INITIAL_BOARD.sort(() => this.random.next() - 0.5);
    initialOrder.forEach((color, index) => {
      const square = this.boardRef().createComponent(SquareComponent);
      square.instance.color = color;
      if (color === SquareColor.NONE) {
        this.emptySquare = index;
      }
      this.squares.push(square.instance);
    });
    this.squares[this.emptySquare].color = this.squares[12].color;
    this.squares[12].color = SquareColor.NONE;
    this.emptySquare = 12;
    this.changeDetectorRef.detectChanges();
    this.resizeContainer(this.boardContainer());
    this.resizeContainer(this.targetContainer());
    setInterval(() => {
      this.showStartMessage = false;
      this.isPlaying = true;
    }, 1000);
  }

  @HostListener('window:resize', [])
  protected onResize() {
    this.resizeContainer(this.boardContainer());
    this.resizeContainer(this.targetContainer());
  }

  private resizeContainer(container: ElementRef<HTMLDivElement>) {
    const parentWidth = container.nativeElement.parentElement?.clientWidth ?? 0;
    const parentHeight =
      container.nativeElement.parentElement?.clientHeight ?? 0;
    const size =
      parentWidth > parentHeight ? parentHeight + 'px' : parentWidth + 'px';
    container.nativeElement.style.width = size;
    container.nativeElement.style.height = size;
  }

  private canMoveDirection(direction: MoveDirection) {
    if (this.emptySquare < 0) {
      return false;
    }
    switch (direction) {
      case 'up':
        if (this.emptySquare + 5 <= 24) {
          return true;
        }
        return false;
      case 'down':
        if (this.emptySquare - 5 >= 0) {
          return true;
        }
        return false;
      case 'left':
        if ((this.emptySquare + 1) % 5 !== 0) {
          return true;
        }
        return false;
      case 'right':
        if (this.emptySquare % 5 !== 0) {
          return true;
        }
        return false;
      default:
        return false;
    }
  }

  private move(direction: MoveDirection) {
    return new Promise<void>((resolve) => {
      this.isMoving = true;
      const movingSquareIndex =
        direction === 'up'
          ? this.emptySquare + 5
          : direction === 'down'
          ? this.emptySquare - 5
          : direction === 'left'
          ? this.emptySquare + 1
          : this.emptySquare - 1;
      this.squares[movingSquareIndex].move(direction).then(() => {
        const movedSquare = this.squares[movingSquareIndex];
        const emptySquare = this.squares[this.emptySquare];
        this.squares[movingSquareIndex] = emptySquare;
        this.squares[this.emptySquare] = movedSquare;
        this.emptySquare = movingSquareIndex;
        this.isMoving = false;
        resolve();
      });
    });
  }

  private checkWin() {
    const solution = [
      this.squares[6].color,
      this.squares[7].color,
      this.squares[8].color,
      this.squares[11].color,
      this.squares[12].color,
      this.squares[13].color,
      this.squares[16].color,
      this.squares[17].color,
      this.squares[18].color,
    ];
    if (this.target.every((t, i) => solution[i] === t)) {
      console.log('Win');
    } else {
      console.log('Not win');
    }
  }
}
