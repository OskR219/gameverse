import { Component, inject } from '@angular/core';
import { GameService } from './game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private game = inject(GameService);

  constructor() {
    (window as any).gameService = this.game;
  }
}
