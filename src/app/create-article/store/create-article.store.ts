import { signalStore } from '@ngrx/signals';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { withCreateArticleState } from './create-article.state';

export const CreateArticleStore = signalStore(withDevtools('create-article-store'), withCreateArticleState());
