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

  abstract readonly stateChanges: Observable<void>;
  readonly idControl?: string;
  abstract isFocused: boolean;
  abstract hasError: boolean;
  abstract isDisabled: boolean;
  abstract readonly value: T | null;

  abstract onContainerClick(): void;
  abstract writeValue(obj: T): void;
  abstract registerOnChange(fn: (value: T) => void): void;
  abstract registerOnTouched(fn: () => void): void;
  abstract setDisabledState?(isDisabled: boolean): void;
}
