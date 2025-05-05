import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ILoginRequest, IRegisterRequest } from '../models';
import { Observable, map } from 'rxjs';
import { ApiEndpoint, ICurrentUser } from '../../shared';
import { IAuthResponse } from '../models/auth-response.interfaces';
import { environments } from '../../../environments';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    readonly #http = inject(HttpClient);

    readonly apiUrl = environments['apiUrl'];

    register(dto: IRegisterRequest): Observable<ICurrentUser> {
        const url = `${this.apiUrl}${ApiEndpoint.Register}`;

        return this.#http.post<IAuthResponse>(url, dto).pipe(map(({ user }) => user));
    }

    login(dto: ILoginRequest): Observable<ICurrentUser> {
        const url = `${this.apiUrl}${ApiEndpoint.Login}`;

        return this.#http.post<IAuthResponse>(url, dto).pipe(map(({ user }) => user));
    }

    getCurrentUser(): Observable<ICurrentUser> {
        const url = `${this.apiUrl}${ApiEndpoint.CurrentUser}`;

        return this.#http.get<IAuthResponse>(url).pipe(map(({ user }) => user));
    }
}
