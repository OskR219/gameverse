import { animate, AnimationBuilder, style } from '@angular/animations';
import { Component, ElementRef, inject, input, viewChild } from '@angular/core';
import { MoveDirection, SQUARE_COLOR_CLASS, SquareColor } from '../square-sort-race';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrl: './square.component.css',
})
export class SquareComponent {
  private animationBuilder = inject(AnimationBuilder);
  private square = viewChild.required<ElementRef<HTMLDivElement>>('square');
  private x = 0;
  private y = 0;

  color: SquareColor = SquareColor.NONE;

  protected mapColorToClass = SQUARE_COLOR_CLASS;

  move(direction: MoveDirection) {
    const initial = style({ transform: `translate(${this.x}%, ${this.y}%)` });
    const duration = 100;
    let final;
    switch (direction) {
      case 'up':
        final = animate(
          duration,
          style({ transform: `translate(${this.x}%, ${(this.y -= 100)}%)` })
        );
        break;
      case 'down':
        final = animate(
          duration,
          style({ transform: `translate(${this.x}%, ${(this.y += 100)}%)` })
        );
        break;
      case 'left':
        final = animate(
          duration,
          style({ transform: `translate(${(this.x -= 100)}%, ${this.y}%)` })
        );
        break;
      case 'right':
        final = animate(
          duration,
          style({ transform: `translate(${(this.x += 100)}%, ${this.y}%)` })
        );
        break;
    }
    return new Promise<void>((resolve) => {
      const animation = this.animationBuilder.build([initial, final]);
      const player = animation.create(this.square().nativeElement);
      player.play();
      player.onDone(() => resolve());
    });
  }
}
