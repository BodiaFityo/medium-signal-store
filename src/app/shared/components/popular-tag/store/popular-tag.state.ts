import { signalStoreFeature, withComputed, withMethods, withState } from '@ngrx/signals';
import { IPopularTagState } from '../models';
import { computed, inject } from '@angular/core';
import { PopularTagService } from '../services';
import { immerPatchState } from 'ngrx-immer/signals';
import { HttpErrorResponse } from '@angular/common/http';

export const initialState: IPopularTagState = {
    data: null,
    isLoading: false,
    error: null,
};

export function withPopularTagState() {
    return signalStoreFeature(
        withState<IPopularTagState>(initialState),
        withMethods((store) => {
            const popularTagService = inject(PopularTagService);

            return {
                getTags() {
                    immerPatchState(store, (state: IPopularTagState) => {
                        state.isLoading = true;
                    });
                    popularTagService.getPopularTags().subscribe({
                        next: (popularTags) => {
                            immerPatchState(store, (state: IPopularTagState) => {
                                state.data = popularTags;
                                state.isLoading = false;
                                state.error = null;
                            });
                        },
                        error: (error: HttpErrorResponse) => {
                            immerPatchState(store, (state: IPopularTagState) => {
                                state.isLoading = false;
                                state.error = error.error.error;
                            });
                        },
                    });
                },
            };
        }),
        withComputed((store) => ({
            popularTags: computed(() => store.data()?.tags),
            isLoading: computed(() => store.isLoading()),
            error: computed(() => store.error()),
        })),
    );
}
