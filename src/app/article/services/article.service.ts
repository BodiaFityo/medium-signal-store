import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environments } from '../../../environments';
import { ApiEndpoint, IArticle, IArticleResponse } from '../../shared';

@Injectable({
    providedIn: 'root',
})
export class ArticleService {
    readonly #http = inject(HttpClient);
    readonly #apiUrl = environments['apiUrl'];

    getArticle(slug: string): Observable<IArticle> {
        const url = `${this.#apiUrl}${ApiEndpoint.Articles}/${slug}`;

        return this.#http.get<IArticleResponse>(url).pipe(map(({ article }) => article));
    }

    deleteArticle(slug: string): Observable<{}> {
        const url = `${this.#apiUrl}${ApiEndpoint.Articles}/${slug}`;

        return this.#http.delete(url);
    }
}
