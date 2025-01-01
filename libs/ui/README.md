# @p1kka/ui

A modern Angular UI component library built with Angular 17+, featuring standalone components, signals, and a powerful theming system. This library provides a collection of reusable, accessible, and customizable UI components.

## Features

- 🏗️ Built with Angular 17+ and TypeScript
- 📦 Standalone components architecture
- 🎯 Fully typed with TypeScript
- 🎨 Customizable theming system
- 🔄 Angular Signals integration
- 🎭 Built-in animations
- ♿ Accessibility-first components

## Installation

```bash
npm install @p1kka/ui @angular/cdk
```

## Quick Setup

1. Add Material Icons to your project (in `index.html`):

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

2. Configure styles (in `styles.scss`):

```scss
@use '@p1kka/ui' as pk;

$theme-config: (
  primary: #FABD00,    // Your primary color
  secondary: #3B7468,  // Your secondary color
  tertiary: #3B743B,   // Your tertiary color
  error: #C50000       // Your error color
);

:root {
  @include pk.generate-theme-variables($theme-config);
}
```

3. Configure animations in your app:

```typescript
// For standalone applications (main.ts)
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(RootComponent, {
  providers: [provideAnimations()]
});
```

## Usage

Import and use components directly in your templates:

```typescript
import { ButtonComponent } from '@p1kka/ui/actions';
import { FormFieldComponent } from '@p1kka/ui/forms';

@Component({
  // ...
  imports: [ButtonComponent, FormFieldComponent],
  template: `
    <pk-button variant="primary">Click me</pk-button>
    <pk-form-field>
      <input pkInput placeholder="Enter text">
    </pk-form-field>
  `
})
export class YourComponent {}
```

## Available Components

### Actions
- `ButtonComponent` - Versatile button component with multiple variants

### Forms
- `FormFieldComponent` - Wrapper for form controls
- `InputDirective` - Enhanced input control
- `SelectComponent` - Custom select component

### Feedback
- `SpinnerComponent` - Loading indicator

## Theming

The library includes a powerful theming system that generates color variations and CSS variables:

```scss
// Example theme configuration
$theme-config: (
  primary: #FABD00,
  secondary: #3B7468,
  tertiary: #3B743B,
  error: #C50000
);
```

### Available CSS Variables

Each color generates multiple shades accessible via CSS variables:

```css
--pk-primary-50  /* lightest shade */
--pk-primary-100
--pk-primary-200
--pk-primary-300
--pk-primary-400
--pk-primary-500 /* base color */
--pk-primary-600
--pk-primary-700
--pk-primary-800
--pk-primary-900
--pk-primary-950 /* darkest shade */
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Requirements

- Angular 17+
- @angular/cdk 17+
- Node.js 16+

## Contributing

We welcome contributions! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT License - see LICENSE file for details

## Support

For bug reports and feature requests, please visit our [GitHub repository](https://github.com/Pikk4/ui).

For detailed documentation and examples, visit our [Storybook documentation](https://your-storybook-url).
