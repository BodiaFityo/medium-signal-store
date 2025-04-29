import { ChangeDetectionStrategy, Component, OnInit, effect, inject } from '@angular/core';
import { AuthStore } from '../../store';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ILoginForm } from './models';
import { LoginFormField } from './constants';
import { BackendErrorsComponent } from '../../../shared';
import { ILoginRequest } from '../../models';
import { AuthValidationService } from '../../services';

@Component({
    selector: 'mds-login',
    imports: [ReactiveFormsModule, BackendErrorsComponent, RouterLink],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
    readonly #authStore = inject(AuthStore);
    readonly #authValidationService = inject(AuthValidationService);
    readonly #router = inject(Router);
    readonly #fb = inject(FormBuilder);

    readonly validationErrors = this.#authStore.validationErrors;
    readonly isSubmitting = this.#authStore.isSubmitting;
    readonly isUserRegistred = this.#authStore.isUserRegistred;

    loginForm!: FormGroup<ILoginForm>;

    #userRedirect = effect(() => {
        if (this.isUserRegistred()) {
            this.#router.navigateByUrl('/');
        }
    });

    ngOnInit(): void {
        this._initForm();
        this._clearValidationErrors();
    }

    private _initForm(): void {
        this.loginForm = this.#fb.group<ILoginForm>({
            [LoginFormField.email]: this.#fb.control('', { nonNullable: true }),
            [LoginFormField.password]: this.#fb.control('', { nonNullable: true }),
        });
    }

    private _clearValidationErrors(): void {
        if (this.validationErrors()) {
            this.#authValidationService.clearValidationErrors();
        }
    }

    onSubmit(): void {
        const user: ILoginRequest = {
            user: this.loginForm.getRawValue(),
        };
        this.#authStore.loginUser(user);
    }
}
