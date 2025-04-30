import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'register',
        loadChildren: () => import('./auth').then((m) => m.registerRoutes),
    },
    {
        path: 'login',
        loadChildren: () => import('./auth').then((m) => m.loginRoutes),
    },
];
