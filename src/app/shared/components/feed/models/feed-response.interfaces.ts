import { IArticle } from '../../../models';

export interface IFeedResponse {
    articles: IArticle[];
    articlesCount: number;
}
