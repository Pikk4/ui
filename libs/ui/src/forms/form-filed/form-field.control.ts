import { Directive } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

import { Observable } from 'rxjs';

export interface FormFieldStateChange {
  hasError: boolean;
  isDisabled: boolean;
  isFocused: boolean;
}

@Directive()
export abstract class FormFieldControl<T> implements ControlValueAccessor {
  abstract get value(): T;
  abstract set value(obj: T);

  abstract readonly stateChanges: Observable<FormFieldStateChange>;
  readonly id?: string;

  abstract onContainerClick(): void;
  abstract writeValue(obj: T): void;
  abstract registerOnChange(fn: (value: T) => void): void;
  abstract registerOnTouched(fn: () => void): void;
  abstract setDisabledState?(isDisabled: boolean): void;
}
