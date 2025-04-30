import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { IBackendErrors } from '../../models';
import { mapBackendErrorsForView } from '../../mappers';

@Component({
    selector: 'mds-backend-errors',
    imports: [],
    templateUrl: './backend-errors.component.html',
    styleUrl: './backend-errors.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackendErrorsComponent {
    errors = input<IBackendErrors | null>({});

    readonly messages = computed(() => mapBackendErrorsForView(this.errors()));
}
