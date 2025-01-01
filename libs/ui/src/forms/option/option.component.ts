import { Highlightable } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  output,
  Renderer2,
  signal,
  viewChild,
} from '@angular/core';

export class PkOptionSelectChange<T = any> {
  constructor(
    /** Reference to the option that emitted the event. */
    public source: OptionComponent<T>,
    /** Whether the change in the option's value was a result of a user action. */
    public isUserInput = false
  ) {}
}

@Component({
  selector: 'pk-option',
  imports: [CommonModule],
  templateUrl: './option.component.html',
  styleUrl: './option.component.scss',
})
export class OptionComponent<T = any> implements Highlightable {
  static nextId = 0;

  private readonly elementRef = inject(ElementRef<HTMLElement>);
  textContent = viewChild<ElementRef<HTMLElement>>('textContent');

  id = input<string>(`pk-option-${OptionComponent.nextId++}`);
  value = input.required<T>();
  selectionChange = output<PkOptionSelectChange<T>>();

  isSelected = signal(false);
  isActive = signal(false);

  selectViaInteraction() {
    this.isSelected.set(true);
    this._emitSelectionChangeEvent(true);
  }

  select() {
    this.isSelected.set(true);
    this._emitSelectionChangeEvent();
  }

  deselect() {
    this.isSelected.set(false);
    this._emitSelectionChangeEvent();
  }

  setActiveStyles(): void {
    this.isActive.set(true);
  }
  setInactiveStyles(): void {
    this.isActive.set(false);
  }

  getTextContent() {
    return this.textContent()?.nativeElement.innerHTML ?? '';
  }

  getLabel?(): string {
    return this.getTextContent();
  }

  getHostElement() {
    return this.elementRef.nativeElement;
  }

  scrollIntoView() {
    this.elementRef.nativeElement.scrollIntoView({
      behavior: 'auto',
    });
  }

  @HostListener('click')
  onClick() {
    this.selectViaInteraction();
  }

  /**
   * Emits a selection change event.
   * @param isUserInput Whether the change was triggered by user interaction.
   * @private
   */
  private _emitSelectionChangeEvent(isUserInput = false): void {
    this.selectionChange.emit(new PkOptionSelectChange<T>(this, isUserInput));
  }
}
