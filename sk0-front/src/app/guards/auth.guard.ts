import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { isLoggedIn } from '../auth/store/auth.selectors';
import { tap } from 'rxjs';
import { Store, select } from '@ngrx/store';

export const authGuard: CanActivateFn = () => {
    const store = inject(Store);
    const router = inject(Router);

    return store.pipe(
        select(isLoggedIn),
        tap(value => {
            return value ? true : router.navigate(['/login'])
        })
    )
}

