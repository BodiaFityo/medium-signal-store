import { IArticle, ICurrentUser } from '../models';

export function isAuthor(article: IArticle | null, currentUser: ICurrentUser | null): boolean {
    return article?.author.username === currentUser?.username;
}
