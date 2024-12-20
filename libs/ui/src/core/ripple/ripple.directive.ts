import { Directive, ElementRef, HostListener, inject, input } from '@angular/core';

@Directive({
  selector: '[pkRipple]',
  standalone: true
})
export class RippleDirective {
  private _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  disabled = input<boolean>(false);

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    if (this.disabled()) return;

    const element = this._elementRef.nativeElement;
    const rect = element.getBoundingClientRect();

    // Ensure relative positioning
    element.style.position = 'relative';
    element.style.overflow = 'hidden';

    // Create ripple element
    const ripple = document.createElement('div');

    // Calculate ripple size (using the larger dimension of the element)
    const size = Math.max(element.offsetWidth, element.offsetHeight);
    const finalSize = size * 2;

    // Position the ripple where clicked
    ripple.style.width = ripple.style.height = `${finalSize}px`;
    ripple.style.left = `${event.clientX - rect.left - finalSize / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - finalSize / 2}px`;

    // Style the ripple
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.backgroundColor = 'var(--pk-ripple-color, white)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple-animation 0.4s ease-out forwards';

    // Add ripple to element
    element.appendChild(ripple);

    // Remove ripple after animation
    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });
  }
}
