import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { signalStore } from '@ngrx/signals';
import { withArticleState } from './article.state';

export const ArticleStore = signalStore({ providedIn: 'root' }, withDevtools('article-store'), withArticleState());
