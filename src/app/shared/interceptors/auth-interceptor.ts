import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { PersistanceService } from '../services';
import { inject } from '@angular/core';
import { StorageKey } from '../constants';
import { Observable } from 'rxjs';

export const authInterceptor = (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
    const persistanceService = inject(PersistanceService);
    const token = persistanceService.get(StorageKey.AccessToken);
    const newRequest = request.clone({
        setHeaders: {
            Authorization: token ? `Token ${token}` : '',
        },
    });

    return next(newRequest);
};
