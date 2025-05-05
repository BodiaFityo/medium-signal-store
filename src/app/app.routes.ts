import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./home-feed').then((m) => m.homeFeedRoutes),
    },
    {
        path: 'register',
        loadChildren: () => import('./auth').then((m) => m.registerRoutes),
    },
    {
        path: 'login',
        loadChildren: () => import('./auth').then((m) => m.loginRoutes),
    },
];
