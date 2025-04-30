import { ChangeDetectionStrategy, Component, OnInit, effect, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IRegisterForm } from './models';
import { RegisterFormField } from './constants';
import { Router, RouterLink } from '@angular/router';
import { AuthStore } from '../../store';
import { IRegisterRequest } from '../../models';
import { BackendErrorsComponent } from '../../../shared';
import { AuthValidationService } from '../../services';

@Component({
    selector: 'mds-register',
    imports: [ReactiveFormsModule, RouterLink, BackendErrorsComponent],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
    readonly #fb = inject(FormBuilder);
    readonly #authStore = inject(AuthStore);
    readonly #authValidationService = inject(AuthValidationService);
    readonly #router = inject(Router);

    readonly registerFormField = RegisterFormField;

    readonly isSubmitting = this.#authStore.isSubmitting;
    readonly isUserRegistred = this.#authStore.isUserRegistred;
    readonly validationErrors = this.#authStore.validationErrors;

    registerForm!: FormGroup<IRegisterForm>;

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
        this.registerForm = this.#fb.group<IRegisterForm>({
            [RegisterFormField.username]: this.#fb.control('', {
                nonNullable: true,
            }),
            [RegisterFormField.email]: this.#fb.control('', {
                nonNullable: true,
            }),
            [RegisterFormField.password]: this.#fb.control('', {
                nonNullable: true,
            }),
        });
    }

    private _clearValidationErrors(): void {
        if (this.validationErrors()) {
            this.#authValidationService.clearValidationErrors();
        }
    }

    onSubmit() {
        const registerUser: IRegisterRequest = {
            user: this.registerForm.getRawValue(),
        };
        this.#authStore.registerUser(registerUser);
    }
}
