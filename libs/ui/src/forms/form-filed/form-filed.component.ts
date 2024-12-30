import { CommonModule } from '@angular/common';
import { Component, ContentChild, InjectionToken, input } from '@angular/core';

import { FormFieldControl } from './form-field.control';

export const PK_FORM_FIELD = new InjectionToken<FormFiledComponent>('PK_FORM_FIELD');

@Component({
  selector: 'pk-form-filed',
  standalone: true,
  imports: [CommonModule],
  providers: [
    { provide: PK_FORM_FIELD, useExisting: FormFiledComponent },
  ],
  templateUrl: './form-filed.component.html',
  styleUrl: './form-filed.component.scss',
})
export class FormFiledComponent {
  @ContentChild(FormFieldControl) control?: FormFieldControl<unknown>;
  label = input<string>();
}
