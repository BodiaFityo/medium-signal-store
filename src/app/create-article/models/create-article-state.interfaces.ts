import { IBackendErrors } from '../../shared';

export interface ICreateArticleState {
    isSubmitting: boolean;
    validationErrors: IBackendErrors | null;
}
