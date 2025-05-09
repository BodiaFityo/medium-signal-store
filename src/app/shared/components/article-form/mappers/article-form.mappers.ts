import { FormControl } from '@angular/forms';
import { ArticleFormField } from '../costants';
import { IArticleForm, IArticleFormValues } from '../models';

//TODO: Implement mapper
export function mapArticleForView(values: IArticleFormValues | null | undefined): IArticleForm {
    return {
        [ArticleFormField.title]: new FormControl(values?.title ?? '', { nonNullable: true }),
        [ArticleFormField.description]: new FormControl(values?.description ?? '', { nonNullable: true }),
        [ArticleFormField.body]: new FormControl(values?.body ?? '', { nonNullable: true }),
        [ArticleFormField.tagList]: new FormControl(values?.tagList?.join(' ') ?? '', { nonNullable: true }),
    };
}
