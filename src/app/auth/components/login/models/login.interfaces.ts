import { FormControl } from '@angular/forms';
import { LoginFormField } from '../constants';

export interface ILoginForm {
    [LoginFormField.email]: FormControl<string>;
    [LoginFormField.password]: FormControl<string>;
}
