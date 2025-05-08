import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class NavigationService {
    readonly #router = inject(Router);

    goToHome(): void {
        this.#router.navigateByUrl('/');
    }
}
