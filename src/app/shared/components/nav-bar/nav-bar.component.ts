import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthFacade } from '../../services';

@Component({
    selector: 'mds-nav-bar',
    imports: [RouterLink],
    templateUrl: './nav-bar.component.html',
    styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
    readonly #authFacade = inject(AuthFacade);

    readonly currentUser = this.#authFacade.currentUser;
}
