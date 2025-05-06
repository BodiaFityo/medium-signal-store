import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { signalStore } from '@ngrx/signals';
import { withPopularTagState } from './popular-tag.state';

export const PopularTagStore = signalStore(
    { providedIn: 'root' },
    withDevtools('popular-tag-store'),
    withPopularTagState(),
);
