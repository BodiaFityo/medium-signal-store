import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ArticleFormComponent } from '../shared/components/article-form/article-form.component';
import { IArticleFormValues } from '../shared/components/article-form/models';
import { CreateArticleStore } from './store';
import { ICreateArticleRequest } from '../shared';

@Component({
    selector: 'mds-create-article',
    imports: [ArticleFormComponent],
    templateUrl: './create-article.component.html',
    styleUrl: './create-article.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateArticleComponent {
    readonly #createArticleStore = inject(CreateArticleStore);

    readonly isSubmitting = this.#createArticleStore.isSubmitting;
    readonly validationErrors = this.#createArticleStore.validationErrors;

    initialValues: IArticleFormValues = {
        body: '',
        description: '',
        tagList: [''],
        title: '',
    };

    onSubmit(articleFormValues: IArticleFormValues): void {
        const createArticle: ICreateArticleRequest = {
            article: articleFormValues,
        };
        this.#createArticleStore.createArticle(createArticle);
    }
}
