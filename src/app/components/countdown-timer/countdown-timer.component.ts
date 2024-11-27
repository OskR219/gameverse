import {
  Component,
  computed,
  effect,
  HostListener,
  input,
  output,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-countdown-timer',
  standalone: true,
  imports: [],
  templateUrl: './countdown-timer.component.html',
  styleUrl: './countdown-timer.component.css',
})
export class CountdownTimerComponent {
  isRunning = input(false);
  time = input(0);
  timeUp = output<void>();
  showElapsedTime = input(false);

  private milliseconds = signal(0);
  private seconds = signal(0);
  private timerInterval: NodeJS.Timeout | null = null;
  private timedUp = false;

  elapsedTime = computed(
    () =>
      `${this.time() - this.seconds()}:${
        this.milliseconds() === 0 ? 0 : 99 - this.milliseconds()
      }`
  );

  @HostListener('window:focus', [])
  onWindowFocus() {
    this.forceResume();
  }

  @HostListener('window:blur', [])
  onWindowBlur() {
    this.forceStop();
  }

  constructor() {
    effect(() => {
      if (this.isRunning() && this.time() > 0) {
        this.forceResume();
      } else {
        this.forceStop();
      }
    });
  }

  private forceStop() {
    if (this.timerInterval !== null) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  private forceResume() {
    if (this.timerInterval === null && !this.timedUp) {
      this.timerInterval = setInterval(() => {
        this.milliseconds.update((m) => m + 1);
        if (this.milliseconds() >= 100) {
          this.seconds.update((s) => s + 1);
          this.milliseconds.set(0);
        }
        if (this.seconds() >= this.time()) {
          this.timedUp = true;
          this.timeUp.emit();
          clearInterval(this.timerInterval!);
        }
      }, 10);
    }
  }
}
