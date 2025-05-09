import { Route } from '@angular/router';
import { CreateArticleComponent } from './create-article.component';
import { CreateArticleService } from './services';
import { CreateArticleStore } from './store';

export const createArticle: Route[] = [
    {
        path: '',
        component: CreateArticleComponent,
        providers: [CreateArticleService, CreateArticleStore],
    },
];
