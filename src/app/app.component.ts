import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthFacade, NavBarComponent } from './shared';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, NavBarComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
    readonly #authFacade = inject(AuthFacade);

    ngOnInit(): void {
        this._loadCurrentUser();
    }

    //Load Current User if exists after page refresh
    private _loadCurrentUser(): void {
        this.#authFacade.loadCurrentUser();
    }
}
