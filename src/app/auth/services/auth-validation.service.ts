import { Injectable, inject } from '@angular/core';
import { AuthStore } from '../store';

@Injectable({
    providedIn: 'root',
})
export class AuthValidationService {
    readonly #authStore = inject(AuthStore);

    clearValidationErrors() {
        this.#authStore.clearValidationErrors();
    }
}
