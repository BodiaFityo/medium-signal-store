import { Injectable, inject } from '@angular/core';
import { AuthStore } from '../../auth/store';

@Injectable({
    providedIn: 'root',
})
export class AuthFacade {
    readonly #authStore = inject(AuthStore);

    readonly currentUser = this.#authStore.currentUser;

    loadCurrentUser(): void {
        this.#authStore.getCurrentUser();
    }
}
