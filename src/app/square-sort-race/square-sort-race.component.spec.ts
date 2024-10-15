import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquareSortRaceComponent } from './square-sort-race.component';

describe('SquareSortRaceComponent', () => {
  let component: SquareSortRaceComponent;
  let fixture: ComponentFixture<SquareSortRaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SquareSortRaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SquareSortRaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
