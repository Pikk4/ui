import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { SelectComponent } from './select.component';
import { FormFiledComponent } from '../form-filed';
import { OptionComponent } from '../option/option.component';

const meta: Meta<SelectComponent<any>> = {
  title: 'Forms/Select',
  component: SelectComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [FormFiledComponent, BrowserAnimationsModule, OptionComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
A customizable select component that provides a dropdown interface for selecting options.
It integrates with Angular's form control system and supports form field integration.

## Features
- Form control integration
- Custom placeholder support
- Disabled state handling
- Overlay positioning
- Keyboard navigation support
- Form field compatibility

## Usage
\`\`\`html
<pk-form-field>
  <pk-select [placeholder]="'Select an option'">
    <pk-option [value]="1">Option 1</pk-option>
    <pk-option [value]="2">Option 2</pk-option>
  </pk-select>
</pk-form-field>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when no option is selected',
    }
  },
};

export default meta;
type Story = StoryObj<SelectComponent<any>>;

export const Default: Story = {
  args: {
    placeholder: 'Select an option',
  },
  render: (args) => ({
    props: args,
    template: `
      <pk-form-filed label="label">
        <pk-select [placeholder]="placeholder">
          <pk-option [value]="1">Option 1</pk-option>
          <pk-option [value]="2">Option 2</pk-option>
          <pk-option [value]="3">Option 3</pk-option>
        </pk-select>
      </pk-form-filed>
    `,
  }),
};
