import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, withLatestFrom } from "rxjs";
import { Store } from "@ngrx/store";

import { profileUpdateFailure, profileUpdateStarted, profileUpdateSuccess } from "./profile.actions";
import { ProfileService } from "../profile.service";
import { AppStore } from "../../app.store";
import { getUserId } from "../../auth/store/auth.selectors";

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly profileService: ProfileService,
    private readonly store$: Store<AppStore>

    // private readonly navCtl: NavController
  ) { }

  handleUpdateProfileEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileUpdateStarted),
      concatLatestFrom(() => this.store$.select(getUserId)),
      switchMap(([action, id]) => {
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
