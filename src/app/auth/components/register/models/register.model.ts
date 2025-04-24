import { FormControl } from '@angular/forms';
import { RegisterFormField } from '../constants';

export interface IRegisterForm {
    [RegisterFormField.username]: FormControl<string>;
    [RegisterFormField.email]: FormControl<string>;
    [RegisterFormField.password]: FormControl<string>;
}
