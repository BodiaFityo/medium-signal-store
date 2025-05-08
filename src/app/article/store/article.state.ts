import { signalStoreFeature, withComputed, withMethods, withState } from '@ngrx/signals';
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
        withMethods((store) => {
            const articleService = inject(ArticleService);

            return {
                getArticle(slug: string) {
                    immerPatchState(store, (state: IArticleState) => {
                        state.isLoading = true;
                    });
                    articleService.getArticle(slug).subscribe({
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
                                state.error = error.error.error;
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
