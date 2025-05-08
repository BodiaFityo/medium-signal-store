import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FeedTogglerRouteName } from './constants';
import { AuthFacade } from '../../services';

@Component({
    selector: 'mds-feed-toggler',
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './feed-toggler.component.html',
    styleUrl: './feed-toggler.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedTogglerComponent {
    tagName = input<string>('');

    readonly #authFacade = inject(AuthFacade);

    readonly feedTogglerRouteName = FeedTogglerRouteName;
    readonly currentUser = this.#authFacade.currentUser;
}
