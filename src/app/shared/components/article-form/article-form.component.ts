import { ChangeDetectionStrategy, Component, OnInit, inject, input, output } from '@angular/core';
import { IArticleForm, IArticleFormValues } from './models';
import { IBackendErrors } from '../../models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ArticleFormField } from './costants';
import { mapArticleForView } from './mappers/article-form.mappers';

@Component({
    selector: 'mds-article-form',
    imports: [],
    templateUrl: './article-form.component.html',
    styleUrl: './article-form.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleFormComponent implements OnInit {
    #fb = inject(FormBuilder);

    initFormData = input<IArticleFormValues | null>(null);
    isSubmitting = input<boolean>(false);
    errors = input<IBackendErrors | null>(null);

    articleSubmit = output<IArticleFormValues>();

    articleForm!: FormGroup<IArticleForm>;
    articleFormField = ArticleFormField;

    ngOnInit(): void {
        this._initForm();
    }

    private _initForm(): void {
        this.articleForm = this.#fb.group<IArticleForm>({
            [ArticleFormField.title]: this.#fb.control('', { nonNullable: true }),
            [ArticleFormField.description]: this.#fb.control('', { nonNullable: true }),
            [ArticleFormField.body]: this.#fb.control('', { nonNullable: true }),
            [ArticleFormField.tagList]: this.#fb.control('', { nonNullable: true }),
        });
    }

    private _updateForm(): void {
        this.articleForm.patchValue(mapArticleForView(this.initFormData()));
    }
}
