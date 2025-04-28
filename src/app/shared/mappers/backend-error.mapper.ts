import { IBackendErrors } from '../models';

export function mapBackendErrorsForView(errors: IBackendErrors | null): string[] {
    if (!errors) {
        return [];
    }
    return Object.keys(errors).map((name: string) => {
        const messages = errors[name].join(' ');
        return `${name}: ${messages}`;
    });
}
