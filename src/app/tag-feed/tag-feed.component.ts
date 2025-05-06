import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { BannerComponent, FeedComponent, FeedTogglerComponent, PopularTagComponent } from '../shared';
import { ActivatedRoute, Params } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'mds-tag-feed',
    imports: [BannerComponent, FeedTogglerComponent, FeedComponent, PopularTagComponent],
    templateUrl: './tag-feed.component.html',
    styleUrl: './tag-feed.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagFeedComponent {
    readonly #route = inject(ActivatedRoute);

    readonly params = toSignal(this.#route.params, { initialValue: {} as Params });

    tagName = computed(() => this.params()['slug']);
    apiUrl = computed(() => {
        const apiUrl = '/articles?tag=';
        return `${apiUrl}${this.tagName()}`;
    });
}
