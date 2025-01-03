import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, input } from '@angular/core';

import { RippleDirective } from '@p1kka/ui/src/core';
import { SpinnerComponent } from '@p1kka/ui/src/feedback';



export type ButtonVariant = 'flat' | 'outline';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[pk-button]',
  imports: [CommonModule, RippleDirective, SpinnerComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  standalone: true,
  host: {
    '[attr.disabled]': 'disabled() || loading()'
  }
})
export class ButtonComponent {
  variant = input<ButtonVariant>('flat');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  private _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
}
