import { signalStoreFeature, withComputed, withMethods, withState } from '@ngrx/signals';

import { computed, inject } from '@angular/core';
import { immerPatchState } from 'ngrx-immer/signals';
import { IAuthState, ILoginRequest, IRegisterRequest } from '../models';

import { ICurrentUser, PersistanceService, StorageKey } from '../../shared';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services';

export const initAuthState: IAuthState = {
    currentUser: null,
    isSubmitting: false,
    isLoading: false,
    validationErrors: null,
};

export function withAuthState() {
    return signalStoreFeature(
        withState<IAuthState>(initAuthState),
        withMethods((store) => {
            const authService = inject(AuthService);
            const persistanceService = inject(PersistanceService);

            return {
                registerUser(dto: IRegisterRequest) {
                    immerPatchState(store, (state: IAuthState) => {
                        state.isLoading = true;
                        state.isSubmitting = true;
                    });
                    authService.register(dto).subscribe({
                        next: (user: ICurrentUser) => {
                            immerPatchState(store, (state: IAuthState) => {
                                state.currentUser = user;
                                state.isLoading = false;
                                state.isSubmitting = false;
                                state.validationErrors = null;
                            });
                            persistanceService.set(StorageKey.accessToken, user.token);
                        },
                        error: (error: HttpErrorResponse) => {
                            console.error(error);
                            immerPatchState(store, (state: IAuthState) => {
                                state.isLoading = false;
                                state.isSubmitting = false;
                                state.validationErrors = error.error.errors;
                            });
                        },
                    });
                },
                loginUser(dto: ILoginRequest) {
                    immerPatchState(store, (state: IAuthState) => {
                        state.isLoading = true;
                        state.isSubmitting = true;
                    });
                    authService.login(dto).subscribe({
                        next: (user: ICurrentUser) => {
                            immerPatchState(store, (state: IAuthState) => {
                                state.currentUser = user;
                                state.isLoading = false;
                                state.isSubmitting = false;
                                state.validationErrors = null;
                            });
                            persistanceService.set(StorageKey.accessToken, user.token);
                        },
                        error: (error: HttpErrorResponse) => {
                            console.error(error);
                            immerPatchState(store, (state: IAuthState) => {
                                state.isLoading = false;
                                state.isSubmitting = false;
                                state.validationErrors = error.error.errors;
                            });
                        },
                    });
                },
                getCurrentUser() {
                    //if we don't have stored token, then we should not load currentUser
                    if (!persistanceService.get(StorageKey.accessToken)) {
                        return;
                    }
                    immerPatchState(store, (state: IAuthState) => {
                        state.isLoading = true;
                        state.isSubmitting = false;
                    });
                    authService.getCurrentUser().subscribe({
                        next: (user: ICurrentUser) => {
                            immerPatchState(store, (state: IAuthState) => {
                                state.currentUser = user;
                                state.isLoading = false;
                                state.isSubmitting = false;
                                state.validationErrors = null;
                            });
                        },
                        error: (error: HttpErrorResponse) => {
                            console.error(error);
                        },
                    });
                },
                clearValidationErrors() {
                    immerPatchState(store, (state: IAuthState) => {
                        state.validationErrors = null;
                    });
                },
            };
        }),
        withComputed((store) => ({
            isSubmitting: computed(() => store.isSubmitting()),
            authErrorMessages: computed(() => store.validationErrors()),
            currentUser: computed(() => store.currentUser()),
            isUserRegistred: computed(() => !!store.currentUser()?.token),
        })),
    );
}
