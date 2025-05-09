import { ArticleFormField } from '../costants';
import { IArticleFormValues, IArticleFormValuesForView } from '../models';

export function mapArticleForView(values: IArticleFormValues): IArticleFormValuesForView {
    return {
        [ArticleFormField.title]: values?.title,
        [ArticleFormField.description]: values?.description,
        [ArticleFormField.body]: values?.body,
        [ArticleFormField.tagList]: values?.tagList?.join(' '),
    };
}

export function mapArticleForDTO(values: IArticleFormValuesForView): IArticleFormValues {
    return { ...values, tagList: values.tagList?.split(' ') };
}
