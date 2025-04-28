import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IRegisterRequest } from '../models';
import { Observable, map } from 'rxjs';
import { ICurrentUser } from '../../shared';
import { IAuthResponse } from '../models/auth-response.interfaces';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private http = inject(HttpClient);
    register(dto: IRegisterRequest): Observable<ICurrentUser> {
        const url = 'http://localhost:3000/api/users';

        return this.http.post<IAuthResponse>(url, dto).pipe(map(({ user }) => user));
    }
}
