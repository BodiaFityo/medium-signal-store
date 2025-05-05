import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IFeedResponse } from '../models';
import { environments } from '../../../../../environments';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FeedService {
    readonly #http = inject(HttpClient);

    readonly #apiUrl = environments['apiUrl'];

    getFeedBack(url: string): Observable<IFeedResponse> {
        const fullUrl = `${this.#apiUrl}${url}`;

        return this.#http.get<IFeedResponse>(fullUrl);
    }
}
