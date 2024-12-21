import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const meta: Meta<ButtonComponent> = {
  title: 'Actions/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule],
    }),
  ],
  argTypes: {
    variant: {
      description: 'The visual style of the button',
      control: 'select',
      options: ['primary', 'secondary', 'outline'],
      table: {
        type: { summary: 'primary | secondary | outline' },
        defaultValue: { summary: 'primary' },
      },
    },
    disabled: {
      description: 'Whether the button is disabled',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      description: 'Whether the button is in loading state',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
## Button Component

A versatile button component that supports multiple variants and states.

### Usage
\`\`\`html
<button pk-button variant="primary">Primary Button</button>
<button pk-button variant="secondary">Secondary Button</button>
<button pk-button variant="outline">Outline Button</button>
<button pk-button disabled>Disabled Button</button>
\`\`\`

### Styling
The button component uses CSS variables for customization:
- \`--pk-btn-primary-bg\`: Primary button background color
- \`--pk-btn-secondary-bg\`: Secondary button background color
- \`--pk-btn-disabled-color\`: Disabled button color
- \`--pk-btn-outline-border\`: Outline button border color
- \`--pk-btn-color\`: Text color for primary and disabled states
- \`--pk-btn-secondary-color\`: Text color for secondary and outline states
- \`--pk-btn-padding-x\`: Horizontal padding
- \`--pk-btn-padding-y\`: Vertical padding
- \`--pk-btn-gap\`: Gap between button content elements
- \`--pk-btn-border-radius\`: Button border radius
- \`--pk-btn-height\`: Button height
- \`--pk-btn-shadow\`: Button shadow

### Ripple Effect Variables
- \`--pk-btn-ripple-primary-color\`: Ripple color for primary variant (default: rgba(255, 255, 255, 0.5))
- \`--pk-btn-ripple-secondary-color\`: Ripple color for secondary variant (default: rgb(0, 0, 0))
- \`--pk-btn-ripple-outline-color\`: Ripple color for outline variant (default: rgb(0, 0, 0))`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
  render: (args) => ({
    props: args,
    template: `<button pk-button [variant]="variant" [disabled]="disabled" [loading]="loading">Primary Button</button>`,
  }),
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
  render: (args) => ({
    props: args,
    template: `<button pk-button [variant]="variant" [disabled]="disabled" [loading]="loading">Secondary Button</button>`,
  }),
};

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
  render: (args) => ({
    props: args,
    template: `<button pk-button [variant]="variant" [disabled]="disabled" [loading]="loading">Outline Button</button>`,
  }),
};
