import { Meta, StoryObj } from '@storybook/angular';

import { FormFiledComponent } from './form-filed.component';

const meta: Meta<FormFiledComponent> = {
  title: 'Forms/Form Field',
  component: FormFiledComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Form Field Component

A flexible form field wrapper component that provides consistent styling and behavior for form inputs.
It supports labels and various states (default, focus, filled, error) with customizable styling through CSS variables.

## Features
- Customizable label
- Consistent styling for form inputs
- Support for different states through CSS classes
- Flexible sizing through CSS variables

## CSS Variables

The following CSS variables can be overwritten to customize the appearance:

\`\`\`css
--pk-form-field-min-height    // Default: 40px
--pk-form-field-min-width     // Default: 230px

// Border Colors
--pk-form-field-default-border-color  // Default: #7C7D7A
--pk-form-field-focus-border-color    // Default: var(--pk-primary-500)
--pk-form-field-filled-border-color   // Default: var(--pk-primary-800)
--pk-form-field-error-border-color    // Default: var(--pk-error-500)
\`\`\`

## Usage Example
\`\`\`html
<pk-form-filed [label]="'Username'">
  <input pkInput placeholder="Enter username">
</pk-form-filed>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the form field',
    },
  },
};

export default meta;
type Story = StoryObj<FormFiledComponent>;

export const Default: Story = {
  args: {
    label: 'Label',
  },
  render: (args) => ({
    props: args,
    template: `
      <pk-form-filed [label]="label">
        <input class="pikka-w-full pikka-bg-transparent pikka-outline-none" placeholder="Placeholder text">
      </pk-form-filed>
    `,
  }),
};
