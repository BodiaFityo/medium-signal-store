import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IRegisterForm } from './models';
import { RegisterFormField } from './constants';

@Component({
    selector: 'mds-register',
    imports: [ReactiveFormsModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
    readonly #fb = inject(FormBuilder);
    readonly registerFormField = RegisterFormField;

    registerForm!: FormGroup<IRegisterForm>;

    ngOnInit(): void {
        this._initForm();
    }

    onSubmit() {
        console.log(this.registerForm.getRawValue());
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
}
