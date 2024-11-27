import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SquareSortRaceRoutingModule } from './square-sort-race-routing.module';
import { SquareSortRaceComponent } from './square-sort-race.component';
import { SquareComponent } from './square/square.component';
import { AppModule } from '../app.module';
import { OverlayMessageComponent } from '../components/overlay-message/overlay-message.component';
import { CountdownTimerComponent } from '../components/countdown-timer/countdown-timer.component';

@NgModule({
  declarations: [SquareSortRaceComponent, SquareComponent],
  imports: [
    CommonModule,
    SquareSortRaceRoutingModule,
    OverlayMessageComponent,
    CountdownTimerComponent,
  ],
})
export class SquareSortRaceModule {}
