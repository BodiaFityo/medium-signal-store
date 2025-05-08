import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./home-feed').then((m) => m.homeFeedRoutes),
    },
    {
        path: 'feed',
        loadChildren: () => import('./your-feed').then((m) => m.yourFeedRoutes),
    },
    {
        path: 'tags/:slug',
        loadChildren: () => import('./tag-feed').then((m) => m.tagFeedRoutes),
    },
    {
        path: 'article/:slug',
        loadChildren: () => import('./article').then((m) => m.articleRoutes),
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
