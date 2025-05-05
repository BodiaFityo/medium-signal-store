import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { signalStore } from '@ngrx/signals';
import { withFeedState } from './feed.state';

export const FeedStore = signalStore({ providedIn: 'root' }, withDevtools('feed-store'), withFeedState());
