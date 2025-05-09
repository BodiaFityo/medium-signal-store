import { FormControl } from '@angular/forms';
import { ArticleFormField } from '../costants';

export interface IArticleFormValues {
    title: string;
    description: string;
    body: string;
    tagList: string[];
}

export type IArticleFormValuesForView = Omit<IArticleFormValues, 'tagList'> & {
    tagList: string;
};

export interface IArticleForm {
    [ArticleFormField.title]: FormControl<string>;
    [ArticleFormField.description]: FormControl<string>;
    [ArticleFormField.body]: FormControl<string>;
    [ArticleFormField.tagList]: FormControl<string>;
}
