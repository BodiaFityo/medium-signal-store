import { Component, input } from '@angular/core';

@Component({
    selector: 'mds-loading',
    imports: [],
    templateUrl: './loading.component.html',
    styleUrl: './loading.component.scss',
})
export class LoadingComponent {
    message = input<string>('Loading...');
}
