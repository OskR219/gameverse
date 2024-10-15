import { Component, input } from '@angular/core';

@Component({
  selector: 'app-overlay-message',
  standalone: true,
  imports: [],
  templateUrl: './overlay-message.component.html',
  styleUrl: './overlay-message.component.css'
})
export class OverlayMessageComponent {
  show = input.required<boolean>();
}
