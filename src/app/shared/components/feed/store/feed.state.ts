import { signalStoreFeature, withComputed, withMethods, withState } from '@ngrx/signals';
import { IFeedState } from '../models';
import { computed, inject } from '@angular/core';
import { FeedService } from '../services/feed.service';
import { immerPatchState } from 'ngrx-immer/signals';
import { HttpErrorResponse } from '@angular/common/http';

export const initialState: IFeedState = {
    data: null,
    isLoading: false,
    error: null,
};

export function withFeedState() {
    return signalStoreFeature(
        withState<IFeedState>(initialState),
        withMethods((store) => {
            const feedService = inject(FeedService);
            return {
                getFeed(url: string) {
                    immerPatchState(store, (state: IFeedState) => {
                        state.isLoading = true;
                        state.error = null;
                    });
                    feedService.getFeedBack(url).subscribe({
                        next: (feed) => {
                            immerPatchState(store, (state: IFeedState) => {
                                state.data = feed;
                                state.isLoading = false;
                            });
                        },
                        error: (errors: HttpErrorResponse) => {
                            immerPatchState(store, (state: IFeedState) => {
                                state.error = errors.error.errors;
                            });
                        },
                    });
                },
            };
        }),
        withComputed((store) => ({
            feed: computed(() => store.data()),
            isLoading: computed(() => store.isLoading()),
            error: computed(() => store.error()),
        })),
    );
}
