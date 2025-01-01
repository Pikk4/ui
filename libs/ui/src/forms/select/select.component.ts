import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import {
  ConnectedPosition,
  Overlay,
  OverlayModule,
} from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  contentChildren,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  OnDestroy,
  Renderer2,
  signal,
  viewChild,
} from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { NgControl } from '@angular/forms';

import {
  BehaviorSubject,
  filter,
  merge,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs';

import { FormFiledComponent, PK_FORM_FIELD } from '../form-filed';
import { selectAnimations } from './select.animations';
import { FormFieldControl } from '../form-filed/form-field.control';
import {
  OptionComponent,
  PkOptionSelectChange,
} from '../option/option.component';

@Component({
  selector: 'pk-select',
  imports: [CommonModule, OverlayModule, OptionComponent],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  providers: [{ provide: FormFieldControl, useExisting: SelectComponent }],
  animations: [selectAnimations.transformPanel, selectAnimations.rotateChevron],
  host: {
    '[attr.tabindex]': 'isDisabled ? -1 : tabIndex()',
  },
})
export class SelectComponent<T>
  implements FormFieldControl<T>, OnDestroy, AfterViewInit
{
  // Static properties
  private static nextId = 0;

  // Injected dependencies
  private readonly overlay = inject(Overlay);
  private readonly parentFormField = inject<FormFiledComponent>(PK_FORM_FIELD, {
    optional: true,
  });
  private readonly renderer = inject(Renderer2);
  private readonly elementRef = inject(ElementRef<HTMLDivElement>);
  private readonly ngControl = inject(NgControl, {
    optional: true,
    self: true,
  });
  options = contentChildren(OptionComponent);
  private _panel = viewChild<ElementRef<HTMLDivElement>>('panel');

  // Input signals
  readonly id = input<string>(`pk-select-${SelectComponent.nextId++}`);
  readonly placeholder = input<string>();
  readonly tabIndex = input<number>(1);

  // State signals and observables
  private readonly stateSubject = new BehaviorSubject<void>(undefined);
  private readonly optionChange = new Subject<void>();
  readonly stateChanges: Observable<void> = this.stateSubject.asObservable();
  readonly isOpen = signal(false);

  // Private state properties
  private _isFocused = false;
  private _isDisabled = false;
  private _value: T | null = null;
  private _selectedOptionText = signal('');
  readonly _destroy = new Subject<void>();
  private _keyManager?: ActiveDescendantKeyManager<OptionComponent>;

  // Overlay configuration
  readonly scrollStrategy = this.overlay.scrollStrategies.reposition();
  readonly positions: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
      offsetY: 8,
    },
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom',
    },
  ];

  // Component state
  overlayWidth: string | number = 0;

  // Control value accessor callbacks
  private onChange?: (value: T) => void;
  private onTouched?: () => void;

  // Public getters
  get isFocused(): boolean {
    return this._isFocused;
  }

  get hasError(): boolean {
    return this.ngControl?.errors != null;
  }

  get isDisabled(): boolean {
    return this._isDisabled;
  }

  get value(): T | null {
    return this._value;
  }

  get idControl(): string {
    return this.id();
  }

  get selectedOptionText(): string {
    return this._selectedOptionText();
  }

  get parentOrigin(): ElementRef<HTMLElement> | undefined | null {
    return this.parentFormField?.parent();
  }

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
    this.renderer.addClass(this.elementRef.nativeElement, 'pikka-outline-none');
    this.renderer.addClass(this.elementRef.nativeElement, 'pikka-w-full');

    effect(() => {
      this.optionChange.next();
      const options = this.options();
      this._resetOptions(options);
    });
  }

  ngAfterViewInit(): void {
    if (this.parentOrigin) {
      this.overlayWidth = this.getOverlayOriginWidth(this.parentOrigin);
    }
    this.initKeyManager();
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
    this.optionChange.next();
    this.optionChange.complete();
  }

  // Form control interface methods
  writeValue(value: T): void {
    this._value = value;
    this.stateSubject.next();
  }

  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._isDisabled = isDisabled;
    this.stateSubject.next();
  }

  onContainerClick(): void {
    this.openModal();
  }

  // Modal control methods
  openModal(): void {
    this.isOpen.set(true);
    this._isFocused = true;
    this.stateSubject.next();

    if (this.parentOrigin) {
      this.overlayWidth = this.getOverlayOriginWidth(this.parentOrigin);
    }
  }

  closeModal(): void {
    this.isOpen.set(false);
    this._isFocused = false;
    this.stateSubject.next();
  }

  detachModal() {
    this.isOpen.set(false);
  }

  onPanelKeydown(event: KeyboardEvent) {
    const keyCode = event.key;

    if (keyCode === 'ArrowUp' || keyCode === 'ArrowDown') {
      event.preventDefault();
      this._keyManager?.onKeydown(event);
    } else if (keyCode === 'Enter' || keyCode === ' ') {
      event.preventDefault();
      const activeOption = this._keyManager?.activeItem;
      if (activeOption) {
        activeOption.selectViaInteraction();
      }
    } else if (keyCode === 'Escape') {
      event.preventDefault();
      this.isOpen.set(false);

    } else {
      // Let typeahead handle other keys if enabled
      if (this._keyManager?.isTyping()) {
        this._keyManager.onKeydown(event);
      }
    }
  }

  // Private helpers
  private getOverlayOriginWidth(element: ElementRef<HTMLElement>): number {
    return element.nativeElement.getBoundingClientRect().width;
  }

  private _resetOptions(options: readonly OptionComponent[]) {
    const optionsChange = options.map((option) =>
      outputToObservable(option.selectionChange)
    );

    merge(...optionsChange)
      .pipe(
        takeUntil(this.optionChange),
        filter((option) => option.isUserInput)
      )
      .subscribe((option) => {
        this.onOptionSelected(option);
      });

    const selectedOption = options.find(
      (option) => option.value() === this.value
    );
    if (selectedOption && this._keyManager) {
      this._keyManager.setActiveItem(selectedOption);
    }
  }

  private initKeyManager() {
    if (!this.options) return;
    this._keyManager = new ActiveDescendantKeyManager<OptionComponent>(
      this.options()
    )
      .withWrap()
      .withVerticalOrientation();

    this._keyManager.change
      .pipe(takeUntil(this._destroy))
      .subscribe((event) => {
        this._scrollOptionIntoView(event);
      });
  }

  private _scrollOptionIntoView(index: number) {
    const options = this.options();
    const option = options[index];
    if (option) {
      const element = option.getHostElement();
      const panel = this._panel()?.nativeElement;
      if (index === 0) {
        panel?.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const optionOffset = element.offsetTop;
        const optionHeight = element.offsetHeight;
        const currentScrollPosition = panel?.scrollTop || 0;
        const panelHeight = panel?.clientHeight || 0;
        const newScrollPosition = this._getOptionScrollPosition(
          optionOffset,
          optionHeight,
          currentScrollPosition,
          panelHeight
        );
        panel?.scrollTo({ top: newScrollPosition, behavior: 'smooth' });
      }
    }
  }

  private onOptionSelected(event: PkOptionSelectChange<T>) {
    const options = this.options();
    options.forEach((option) => {
      if (option !== event.source) {
        option.deselect();
      }
    });

    this._value = event.source.value() as T;
    this.onChange?.(this._value);

    this._selectedOptionText.set(event.source.getTextContent() || '');

    if (this._keyManager) {
      this._keyManager.setActiveItem(event.source);
    }
    this.isOpen.set(false);
    this.stateSubject.next();
  }

  private _getOptionScrollPosition(
    optionOffset: number,
    optionHeight: number,
    currentScrollPosition: number,
    panelHeight: number
  ): number {
    if (optionOffset < currentScrollPosition) {
      return optionOffset;
    }

    if (optionOffset + optionHeight > currentScrollPosition + panelHeight) {
      return Math.max(0, optionOffset - panelHeight + optionHeight);
    }

    return currentScrollPosition;
  }

  @HostListener('focus')
  private onFocus(): void {
    this._isFocused = true;
    this.stateSubject.next();
  }

  @HostListener('blur')
  private onBlur(): void {
    if (!this.isOpen()) {
      this._isFocused = false;
      this.onTouched?.();
      this.stateSubject.next();
    }
  }

  @HostListener('keydown', ['$event'])
  private onKeydown(event: KeyboardEvent) {
    if ((event.key === 'Enter' || event.key === ' ') && !this.isOpen()) {
      this.openModal();
    } else {
      this.onPanelKeydown(event);
    }
  }
}
