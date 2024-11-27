import {
  animate,
  AnimationBuilder,
  keyframes,
  style,
} from '@angular/animations';
import { Component, ElementRef, inject, input, viewChild } from '@angular/core';
import {
  MoveDirection,
  SQUARE_COLOR_CLASS,
  SquareColor,
} from '../square-sort-race';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrl: './square.component.css',
})
export class SquareComponent {
  private animationBuilder = inject(AnimationBuilder);
  private square = viewChild.required<ElementRef<HTMLDivElement>>('square');
  private scoreRef = viewChild.required<ElementRef<HTMLDivElement>>('score');
  private x = 0;
  private y = 0;
  showScore = false;
  points = 0;
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

  score(points: number) {
    this.points = points;
    return new Promise<void>((resolve) => {
      if (this.color === SquareColor.NONE) {
        resolve();
        return;
      }
      this.showScore = true;
      const initial = style({ transform: `scale(0.8)`, offset: 0 });
      const step = style({ transform: `scale(1)`, offset: 0.5 });
      const final = style({ transform: `scale(1)`, offset: 1 });
      const animation = this.animationBuilder.build([
        animate(
          '0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          keyframes([initial, step, final])
        ),
      ]);
      const player = animation.create(this.scoreRef().nativeElement);
      player.play();
      player.onDone(() => {
        this.showScore = false;
        resolve();
      });
    });
  }

  highlight() {
    return new Promise<void>((resolve) => {
      if (this.color === SquareColor.NONE) {
        resolve();
        return;
      }
      this.square().nativeElement.style.zIndex = '1000';
      const initial = style({
        transform: `translate(${this.x}%, ${this.y}%) scale(1)`,
        offset: 0,
      });
      const step0 = style({
        transform: `translate(${this.x}%, ${this.y}%) scale(1)`,
        offset: 0.1,
      });
      const step1 = style({
        transform: `translate(${this.x}%, ${this.y}%) scale(1.3)`,
        offset: 0.25,
      });
      const step2 = style({
        transform: `translate(${this.x}%, ${this.y}%) scale(1.5)`,
        offset: 0.75,
      });
      const final = style({
        transform: `translate(${this.x}%, ${this.y}%) scale(1.0)`,
        offset: 1,
      });
      const animation = this.animationBuilder.build([
        animate(
          '0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          keyframes([initial, step0, step1, step2, final])
        ),
      ]);
      const player = animation.create(this.square().nativeElement);
      player.play();
      player.onDone(() => {
        this.square().nativeElement.style.zIndex = 'auto';
        resolve();
      });
    });
  }
}
