import { AuthState } from './auth/store/auth.reducer';

export interface AppStore {
    auth?: AuthState;
}