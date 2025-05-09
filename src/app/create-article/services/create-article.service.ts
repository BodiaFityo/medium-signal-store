import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiEndpoint, IArticle, IArticleResponse, ICreateArticleRequest } from '../../shared';
import { map, Observable } from 'rxjs';
import { environments } from '../../../environments';

export class CreateArticleService {
    readonly #http: HttpClient = inject(HttpClient);
    readonly #apiUrl = environments['apiUrl'];

    createArticle(articleRequest: ICreateArticleRequest): Observable<IArticle> {
        const url = `${this.#apiUrl}${ApiEndpoint.Articles}`;

        return this.#http.post<IArticleResponse>(url, articleRequest).pipe(map(({ article }) => article));
    }
}
