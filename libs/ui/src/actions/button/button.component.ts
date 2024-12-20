import { Component, ElementRef, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RippleDirective } from '../../core/ripple/ripple.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[pk-button]',
  imports: [CommonModule, RippleDirective, MatProgressSpinnerModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  standalone: true,
  host: {
    '[attr.disabled]': 'disabled() || loading()'
  }
})
export class ButtonComponent {
  variant = input<ButtonVariant>('primary');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  private _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
}
