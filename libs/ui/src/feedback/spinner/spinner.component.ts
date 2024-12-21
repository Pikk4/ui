import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pk-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      class="loader"
      [style.width]="computedSize()"
      [style.height]="computedSize()"
      [style.border-top-width]="computedBorderWidth()"
      [style.border-right-width]="computedBorderWidth()"
    ></span>
  `,
  styleUrl: './spinner.component.scss',
})
export class SpinnerComponent {
  size = input<number>(48);

  protected computedSize = computed(() => `${this.size()}px`);
  protected computedBorderWidth = computed(() => `${Math.max(2, this.size() / 16)}px`);
}
