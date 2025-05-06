import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IPopularTagResponse } from '../models';
import { environments } from '../../../../../environments';
import { ApiEndpoint } from '../../../constants';

@Injectable({
    providedIn: 'root',
})
export class PopularTagService {
    readonly #http = inject(HttpClient);

    readonly #apiUrl = environments['apiUrl'];

    getPopularTags(): Observable<IPopularTagResponse> {
        const url = `${this.#apiUrl}${ApiEndpoint.Tags}`;

        return this.#http.get<IPopularTagResponse>(url);
    }
}
