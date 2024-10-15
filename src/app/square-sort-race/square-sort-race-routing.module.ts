import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SquareSortRaceComponent } from './square-sort-race.component';

const routes: Routes = [{ path: '', component: SquareSortRaceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SquareSortRaceRoutingModule { }
