import { ICreateArticleState } from '../models';
import { signalStoreFeature, withComputed, withMethods, withProps, withState } from '@ngrx/signals';
import { CreateArticleService } from '../services';
import { computed, inject } from '@angular/core';
import { IArticle, ICreateArticleRequest } from '../../shared';
import { immerPatchState } from 'ngrx-immer/signals';
import { HttpErrorResponse } from '@angular/common/http';

export const initState: ICreateArticleState = {
    isSubmitting: false,
    validationErrors: null,
};

export function withCreateArticleState() {
    return signalStoreFeature(
        withState<ICreateArticleState>(initState),
        withProps(() => ({
            _createArticleService: inject(CreateArticleService),
        })),
        withMethods((store) => {
            return {
                createArticle(createArticle: ICreateArticleRequest) {
                    immerPatchState(store, (state: ICreateArticleState) => {
                        state.isSubmitting = true;
                    });
                    store._createArticleService.createArticle(createArticle).subscribe({
                        next: (article: IArticle) => {
                            immerPatchState(store, (state: ICreateArticleState) => {
                                state.isSubmitting = false;
                            });
                        },
                        error: (error: HttpErrorResponse) => {
                            immerPatchState(store, (state: ICreateArticleState) => {
                                state.isSubmitting = false;
                                state.validationErrors = error.error.errors;
                            });
                        },
                    });
                },
            };
        }),
        withComputed((store) => ({
            isSubmitting: computed(() => store.isSubmitting()),
            validationErrors: computed(() => store.validationErrors()),
        })),
    );
}
