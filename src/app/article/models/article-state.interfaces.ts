import { IArticle } from '../../shared';

export interface IArticleState {
    data: IArticle | null;
    isLoading: boolean;
    error: string | null;
}
