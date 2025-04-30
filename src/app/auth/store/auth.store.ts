import { signalStore } from '@ngrx/signals';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { withAuthState } from './auth.state';

export const AuthStore = signalStore({ providedIn: 'root' }, withDevtools('auth-store'), withAuthState());
