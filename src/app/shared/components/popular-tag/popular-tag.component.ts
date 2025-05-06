import { ChangeDetectionStrategy, Component, OnInit, computed, inject } from '@angular/core';
import { PopularTagStore } from './store';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from '../loading';
import { ErrorMessageComponent } from '../error-message';

@Component({
    selector: 'mds-popular-tag',
    imports: [RouterLink, LoadingComponent, ErrorMessageComponent],
    templateUrl: './popular-tag.component.html',
    styleUrl: './popular-tag.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopularTagComponent implements OnInit {
    readonly #popularTagStore = inject(PopularTagStore);

    readonly popularTags = this.#popularTagStore.popularTags;
    readonly isLoading = this.#popularTagStore.isLoading;
    readonly error = computed(() => this.#popularTagStore.error() ?? '');

    ngOnInit(): void {
        this._loadPopularTagds();
    }

    private _loadPopularTagds(): void {
        this.#popularTagStore.getTags();
    }
}
