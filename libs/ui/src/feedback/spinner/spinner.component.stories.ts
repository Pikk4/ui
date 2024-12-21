import { Meta, StoryObj } from '@storybook/angular';
import { SpinnerComponent } from './spinner.component';

const meta: Meta<SpinnerComponent & { color: string }> = {
  title: 'Feedback/Spinner',
  component: SpinnerComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A customizable spinner component for loading states.

## CSS Variables
The spinner can be customized using the following CSS variables:

| Variable | Default | Description |
|----------|---------|-------------|
| --pk-spinner-color | #272725 | The color of the spinner |
| --pk-spinner-animation-duration | 1s | The duration of one complete rotation |

## Size and Border Width
The border width is automatically calculated based on the size input using a 1:16 ratio.
For example:
- size: 48px → border: 3px
- size: 24px → border: 2px
- size: 64px → border: 4px
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'number', min: 16, max: 128 },
      description: 'The size of the spinner in pixels',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '48' },
      },
    },
    color: {
      control: { type: 'color' },
      description: 'The color of the spinner',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#272725' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<SpinnerComponent & { color: string }>;

export const Default: Story = {
  args: {
    size: 48,
    color: '#272725'
  },
  render: (args) => ({
    props: args,
    template: `
      <pk-spinner [size]="size" [style.--pk-spinner-color]="color"></pk-spinner>
    `,
  }),
};

export const Small: Story = {
  args: {
    size: 24,
  },
};

export const Large: Story = {
  args: {
    size: 64,
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 96,
  },
};

export const CustomColor: StoryObj<SpinnerComponent & { color: string }> = {
  args: {
    size: 48,
    color: '#ff0000'
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with custom color using CSS variables',
      },
    },
  },
  argTypes: {
    color: {
      control: { type: 'color' },
      description: 'Custom color for the spinner',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#ff0000' },
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <pk-spinner [size]="size" [style.--pk-spinner-color]="color"></pk-spinner>
    `,
  }),
};


