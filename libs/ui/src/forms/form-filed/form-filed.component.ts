import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  Component,
  contentChild,
  ElementRef,
  HostListener,
  InjectionToken,
  input,
  signal,
  viewChild,
} from '@angular/core';

import { FormFieldControl } from './form-field.control';

/**
 * Injection token for the form field component.
 * Used for dependency injection and component communication.
 */
export const PK_FORM_FIELD = new InjectionToken<FormFiledComponent>(
  'PK_FORM_FIELD'
);

/**
 * Component that wraps form controls and provides a consistent layout and behavior.
 * It manages the form field's state including focus and fill states, and provides
 * a standardized way to display form controls with labels.
 *
 * @example
 * ```html
 * <pk-form-filed label="Username">
 *   <pk-input type="text" />
 * </pk-form-filed>
 * ```
 */
@Component({
  selector: 'pk-form-filed',
  standalone: true,
  imports: [CommonModule],
  providers: [{ provide: PK_FORM_FIELD, useExisting: FormFiledComponent }],
  templateUrl: './form-filed.component.html',
  styleUrl: './form-filed.component.scss',
})
export class FormFiledComponent implements AfterContentInit {
  /**
   * Reference to the form control child component implementing FormFieldControl
   */
  control = contentChild(FormFieldControl);

  /**
   * Reference to the parent container element for DOM manipulation
   */
  parent = viewChild('parent', { read: ElementRef<HTMLDivElement> });

  /**
   * Input signal for the form field label text
   */
  label = input<string>();

  /**
   * Signal tracking the focused state of the form control
   */
  isFocused = signal(false);

  /**
   * Signal tracking whether the form control has a value
   */
  isFilled = signal(false);

  /**
   * Handles click events on the form field container.
   * Delegates the click to the control's onContainerClick method only if
   * the click occurred inside the parent element.
   *
   * @param event The mouse event from the click
   */
  @HostListener('click', ['$event'])
  protected onContainerClick(event: MouseEvent): void {
    const parentElement = this.parent()?.nativeElement;
    if (!parentElement?.contains(event.target as Node)) {
      return;
    }

    const control = this.control();
    if (control) {
      control.onContainerClick();
    }
  }

  /**
   * Lifecycle hook that initializes the component after content initialization.
   * Sets up subscriptions to track the form control's state changes.
   */
  ngAfterContentInit(): void {
    const control = this.control();
    control?.stateChanges.subscribe(() => {
      if (control) {
        this.isFocused.set(control.isFocused);
        this.isFilled.set(control.value != null && control.value !== '');
      }
    });
  }
}
