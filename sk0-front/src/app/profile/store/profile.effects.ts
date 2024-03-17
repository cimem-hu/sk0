import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, withLatestFrom } from "rxjs";

import { ProfileService } from "../profile.service";
import { profileUpdateFailure, profileUpdateStarted, profileUpdateSuccess } from "./profile.actions";
import { Store } from "@ngrx/store";
import { AppStore } from "../../app.store";
import { getUser, getUserId } from "../../auth/store/auth.selectors";

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly profileService: ProfileService,
    private readonly store$: Store<AppStore>
  ) { }

  handleUpdateProfileEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileUpdateStarted),
      withLatestFrom(this.store$.select(getUserId), this.store$.select(getUser)),
      switchMap(([action, id, user]) => {
        if (id !== null && id !== undefined) {
          return this.profileService.update(id, action)
            .pipe(
              map((response) => profileUpdateSuccess(response)),
              catchError((error) => of(profileUpdateFailure({ message: error.message })))
            );
        } else {
          return of(profileUpdateFailure({ message: 'Invalid user id' }));
        }
      })
    )
  );
}
