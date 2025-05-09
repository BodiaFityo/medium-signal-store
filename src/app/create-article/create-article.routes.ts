import { Route } from '@angular/router';
import { CreateArticleComponent } from './create-article.component';

export const createArticle: Route[] = [
    {
        path: '',
        component: CreateArticleComponent,
    },
];
