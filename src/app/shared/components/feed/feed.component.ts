import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal } from '@angular/core';
import { FeedStore } from './store';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { ErrorMessageComponent } from '../error-message';
import { LoadingComponent } from '../loading';
import { PaginationComponent } from '../pagination';
import { LIMIT } from '../../constants';
import { toSignal } from '@angular/core/rxjs-interop';
import queryString from 'query-string';
import { TagListComponent } from '../tag-list';

@Component({
    selector: 'mds-feed',
    imports: [RouterLink, ErrorMessageComponent, LoadingComponent, PaginationComponent, TagListComponent],
    templateUrl: './feed.component.html',
    styleUrl: './feed.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedComponent {
    apiUrl = input<string>('');

    readonly #feedStore = inject(FeedStore);
    readonly #router = inject(Router);
    readonly #route = inject(ActivatedRoute);

    readonly isLoading = this.#feedStore.isLoading;
    readonly error = computed(() => this.#feedStore.error() ?? '');
    readonly articles = computed(() => this.#feedStore.feed()?.articles);
    readonly articlesCount = computed(() => this.#feedStore.feed()?.articlesCount ?? 0);

    /**
     * The number of items displayed per page. This constant is used
     * for pagination logic throughout the application.
     */

    readonly limit = LIMIT;
    /**
     * Converts the `queryParams` observable from Angular's `ActivatedRoute`
     * into a reactive signal using `toSignal()`. This allows reactive access
     * to query parameters (e.g., `?page=2`) within a signal-based component model.
     *
     * The signal is initialized with an empty `Params` object to ensure safe
     * access and avoid `undefined` values.
     */
    readonly queryParams = toSignal(this.#route.queryParams, { initialValue: {} as Params });

    /**
     * Extracts the base part of the current URL, removing any query parameters.
     *
     * For example:
     *   If the URL is `/global-feed?page=2`, this returns `/global-feed`.
     *
     * This is useful for building pagination URLs or routes without query params.
     */

    baseUrl = signal<string>(this.#router.url.split('?')[0]);

    currentPage = computed(() => Number(this.queryParams()['page'] || 1));

    #updateFeed = effect(() => {
        this._loadFeed();
    });

    private _loadFeed(): void {
        const offset = this.currentPage() * this.limit - this.limit;
        const parsedUrl = queryString.parseUrl(this.apiUrl());
        const stringifiedParams = queryString.stringify({
            limit: this.limit,
            offset,
            ...parsedUrl.query,
        });
        const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;

        this.#feedStore.getFeed(apiUrlWithParams);
    }
}
