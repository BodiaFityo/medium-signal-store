import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, computed, inject } from '@angular/core';
import { ArticleStore } from './store';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { ArticleFacade, AuthFacade, TagListComponent } from '../shared';
import { isAuthor } from '../shared/utils';

@Component({
    selector: 'mds-article',
    imports: [RouterLink, CommonModule, TagListComponent],
    templateUrl: './article.component.html',
    styleUrl: './article.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent implements OnInit, OnDestroy {
    readonly #articleStore = inject(ArticleStore);
    readonly #route = inject(ActivatedRoute);
    readonly #authFacade = inject(AuthFacade);
    readonly #articleFacade = inject(ArticleFacade);

    readonly params = toSignal(this.#route.params, { initialValue: {} as Params });

    readonly slug = computed(() => this.params()['slug']);
    readonly isAuthor = computed(() => isAuthor(this.#articleStore.article(), this.#authFacade.currentUser()));

    readonly article = this.#articleStore.article;

    ngOnInit(): void {
        this._loadArticle();
    }

    private _loadArticle() {
        this.#articleStore.getArticle(this.slug());
    }

    private _clearArticle() {
        this.#articleStore.clearArticleState();
    }

    deleteArticle() {
        this.#articleFacade.deleteArticle(this.slug());
    }

    ngOnDestroy(): void {
        this._clearArticle();
    }
}
