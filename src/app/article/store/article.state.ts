import { signalStoreFeature, withComputed, withMethods, withProps, withState } from '@ngrx/signals';
import { IArticleState } from '../models';
import { ArticleService } from '../services';
import { computed, inject } from '@angular/core';
import { immerPatchState } from 'ngrx-immer/signals';
import { HttpErrorResponse } from '@angular/common/http';

export const initState: IArticleState = {
    data: null,
    isLoading: false,
    error: null,
};

export function withArticleState() {
    return signalStoreFeature(
        withState<IArticleState>(initState),
        withProps(() => ({
            _articleService: inject(ArticleService),
        })),
        withMethods((store) => {
            return {
                getArticle(slug: string) {
                    immerPatchState(store, (state: IArticleState) => {
                        state.isLoading = true;
                    });
                    store._articleService.getArticle(slug).subscribe({
                        next: (article) => {
                            immerPatchState(store, (state: IArticleState) => {
                                state.isLoading = false;
                                state.data = article;
                                state.error = null;
                            });
                        },
                        error: (error: HttpErrorResponse) => {
                            immerPatchState(store, (state: IArticleState) => {
                                state.isLoading = false;
                                state.error = error.error.errors;
                            });
                        },
                    });
                },
                clearArticleState() {
                    immerPatchState(store, (state: IArticleState) => {
                        state.isLoading = false;
                        state.error = null;
                        state.data = null;
                    });
                },
            };
        }),
        withComputed((store) => ({
            article: computed(() => store.data()),
            isLoading: computed(() => store.isLoading()),
            error: computed(() => store.error()),
        })),
    );
}
