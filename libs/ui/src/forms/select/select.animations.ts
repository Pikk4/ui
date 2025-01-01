import {
  animate,
  AnimationTriggerMetadata,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const selectAnimations: {
  readonly transformPanel: AnimationTriggerMetadata;
  readonly rotateChevron: AnimationTriggerMetadata;
} = {
  transformPanel: trigger('transformPanel', [
    state(
      'void',
      style({
        opacity: 0,
        transform: 'scale(1, 0.8)',
      }),
    ),
    transition(
      'void => showing',
      animate(
        '120ms cubic-bezier(0, 0, 0.2, 1)',
        style({
          opacity: 1,
          transform: 'scale(1, 1)',
        }),
      ),
    ),
    transition('* => void', animate('100ms linear', style({ opacity: 0 }))),
  ]),
  rotateChevron: trigger('rotateChevron', [
    state('true', style({ transform: 'rotate(-90deg)' })),
    state('false', style({ transform: 'rotate(90deg)' })),
    transition('false <=> true', animate('200ms ease-in-out')),
  ]),
};
