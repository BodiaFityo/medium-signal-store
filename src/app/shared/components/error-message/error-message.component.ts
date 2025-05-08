import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'mds-error-message',
    imports: [],
    templateUrl: './error-message.component.html',
    styleUrl: './error-message.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorMessageComponent {
    message = input<string>('Some Error Occure');
}
