import { Directive, ElementRef, inject, HostListener, Renderer2, input } from '@angular/core';
import { NgControl } from '@angular/forms';

import { BehaviorSubject, Observable } from 'rxjs';

import { FormFieldControl } from '../form-filed/form-field.control';

/**
 * Custom input directive that implements FormFieldControl.
 * Provides form field functionality for native input elements.
 */
@Directive({
  selector: 'input[pkInput], textarea[pkInput]',
  standalone: true,
  providers: [{ provide: FormFieldControl, useExisting: InputDirective }],
  host: {
    '[attr.disabled]': 'isDisabled ? true : undefined',
  },
})
export class InputDirective implements FormFieldControl<string> {
  static nextId = 0;

  // Dependencies
  private readonly elementRef = inject(ElementRef<HTMLInputElement>);
  private readonly ngControl = inject(NgControl, {
    optional: true,
    self: true,
  });
  private readonly renderer = inject(Renderer2);

  // Input signals
  readonly id = input<string>(`pk-input-${InputDirective.nextId++}`);

  // State management
  private readonly stateSubject = new BehaviorSubject<void>(undefined);
  readonly stateChanges: Observable<void> = this.stateSubject.asObservable();

  // Form field properties
  private _isFocused = false;
  private _isDisabled = false;
  private _value = '';

  // Callbacks for ControlValueAccessor
  private onChange?: (value: string) => void;
  private onTouched?: () => void;

  // Getters and setters
  get isFocused(): boolean {
    return this._isFocused;
  }

  get hasError(): boolean {
    return this.ngControl?.errors != null;
  }

  get isDisabled(): boolean {
    return this._isDisabled;
  }

  get idControl(): string {
    return this.id();
  }

  get value(): string | null {
    return this._value || null;
  }

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
    this.renderer.addClass(this.elementRef.nativeElement, 'pikka-outline-none');
    this.renderer.addClass(this.elementRef.nativeElement, 'pikka-w-full');
    this.renderer.setAttribute(this.elementRef.nativeElement, 'id', this.id());
  }

  // UI interaction methods
  onContainerClick(): void {
    this.elementRef.nativeElement.focus();
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this._value = value;
    this.elementRef.nativeElement.value = value;
    this.stateSubject.next();
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._isDisabled = isDisabled;
    this.stateSubject.next();
  }

  // Add HostListeners for focus and blur events
  @HostListener('focus')
  private onFocus(): void {
    if (this._isFocused) return;

    this._isFocused = true;
    this.stateSubject.next();
  }

  @HostListener('blur')
  private onBlur(): void {
    if (!this._isFocused) return;

    this._isFocused = false;
    this.onTouched?.();
    this.stateSubject.next();
  }

  @HostListener('input', ['$event'])
  private onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this._value = input.value;
    this.onChange?.(this._value);
    this.stateSubject.next();
  }
}
