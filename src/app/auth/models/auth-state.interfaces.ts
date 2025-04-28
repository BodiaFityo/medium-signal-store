import { ICurrentUser, IBackendErrors } from '../../shared';

export interface IAuthState {
    currentUser: ICurrentUser | null;
    isSubmitting: boolean;
    isLoading: boolean;
    validationErrors: IBackendErrors | null;
}
