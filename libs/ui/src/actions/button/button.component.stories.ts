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
      options: ['flat', 'outline'],
      table: {
        type: { summary: 'flat | outline' },
        defaultValue: { summary: 'flat' },
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
<button pk-button variant="flat">Flat Button</button>
<button pk-button variant="outline">Outline Button</button>
<button pk-button disabled>Disabled Button</button>
\`\`\`

### Color Variants
The button component comes with predefined color classes that can be combined with variants:

\`\`\`html
<button pk-button variant="flat" class="pk-btn-primary">Primary Button</button>
<button pk-button variant="flat" class="pk-btn-secondary">Secondary Button</button>
<button pk-button variant="flat" class="pk-btn-tertiary">Tertiary Button</button>
<button pk-button variant="flat" class="pk-btn-error">Error Button</button>
\`\`\`

### Custom Color Classes
You can create your own button color variants by defining a class with the following CSS variables:

\`\`\`css
.pk-btn-custom {
  --pk-btn-bg: var(--your-custom-color);
  --pk-btn-color: var(--your-custom-text-color);
}
\`\`\`

### Base Styling Variables
The button component uses these CSS variables for basic customization:
- \`--pk-btn-bg\`: Default button background color
- \`--pk-btn-color\`: Default button text color
- \`--pk-btn-ripple-color\`: Ripple effect color (50% opacity of button text color)
- \`--pk-btn-disabled-bg\`: Background color for disabled state
- \`--pk-btn-disabled-color\`: Text color for disabled state
- \`--pk-btn-padding-x\`: Horizontal padding (12px)
- \`--pk-btn-padding-y\`: Vertical padding (8px)
- \`--pk-btn-border-radius\`: Button border radius (12px)
- \`--pk-btn-height\`: Button height (40px)
- \`--pk-btn-shadow\`: Button shadow (0px 0px 12px rgba(0, 0, 0, 0.12))

### Theme Integration
The button automatically integrates with your theme colors when using the predefined classes:
- \`.pk-btn-primary\`: Uses your theme's primary color
- \`.pk-btn-secondary\`: Uses your theme's secondary color
- \`.pk-btn-tertiary\`: Uses your theme's tertiary color
- \`.pk-btn-error\`: Uses your theme's error color

### Example with Custom Color
\`\`\`scss
// In your styles file
.pk-btn-purple {
  --pk-btn-bg: #6200ee;
  --pk-btn-color: white;
  --pk-btn-ripple-color: color-mix(in srgb, white 50%, transparent);
}
\`\`\`

\`\`\`html
<button pk-button variant="flat" class="pk-btn-purple">Custom Purple Button</button>
\`\`\``,
      },
    },
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Flat: Story = {
  args: {
    variant: 'flat',
  },
  render: (args) => ({
    props: args,
    template: `<button pk-button [variant]="variant" [disabled]="disabled" [loading]="loading">Flat Button</button>`,
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

export const Primary: Story = {
  args: {
    variant: 'flat',
  },
  render: (args) => ({
    props: args,
    template: `<button pk-button [variant]="variant" [disabled]="disabled" [loading]="loading" class="pk-btn-primary">Primary Button</button>`,
  }),
};

export const Secondary: Story = {
  args: {
    variant: 'flat',
  },
  render: (args) => ({
    props: args,
    template: `<button pk-button [variant]="variant" [disabled]="disabled" [loading]="loading" class="pk-btn-secondary">Secondary Button</button>`,
  }),
};

export const Tertiary: Story = {
  args: {
    variant: 'flat',
  },
  render: (args) => ({
    props: args,
    template: `<button pk-button [variant]="variant" [disabled]="disabled" [loading]="loading" class="pk-btn-tertiary">Tertiary Button</button>`,
  }),
};

export const Error: Story = {
  args: {
    variant: 'flat',
  },
  render: (args) => ({
    props: args,
    template: `<button pk-button [variant]="variant" [disabled]="disabled" [loading]="loading" class="pk-btn-error">Error Button</button>`,
  }),
};
