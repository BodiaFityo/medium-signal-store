import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ILoginRequest, IRegisterRequest } from '../models';
import { Observable, map } from 'rxjs';
import { ICurrentUser } from '../../shared';
import { IAuthResponse } from '../models/auth-response.interfaces';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private _http = inject(HttpClient);

    register(dto: IRegisterRequest): Observable<ICurrentUser> {
        const url = 'http://localhost:3000/api/users';

        return this._http.post<IAuthResponse>(url, dto).pipe(map(({ user }) => user));
    }

    login(dto: ILoginRequest): Observable<ICurrentUser> {
        const url = 'http://localhost:3000/api/users/login';

        return this._http.post<IAuthResponse>(url, dto).pipe(map(({ user }) => user));
    }

    getCurrentUser(): Observable<ICurrentUser> {
        const url = 'http://localhost:3000/api/user';

        return this._http.get<IAuthResponse>(url).pipe(map(({ user }) => user));
    }
}
