import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import {
  catchError,
  map,
  mergeMap,
  of,
  pipe,
  switchMap,
  tap,
  withLatestFrom
} from "rxjs";
import { ProfileService } from "../profile.service";
import {
  profileUpdateFailure,
  profileUpdateStarted,
  profileUpdateSuccess
} from "./profile.actions";

import { AppStore } from "../../app.store";
import { getUserId } from "./profile.selectors";

@Injectable()
export class ProfileEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly profileService: ProfileService,
    private readonly store: Store<AppStore>
  ) {}

  handleUpdateProfileEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileUpdateStarted),
      concatLatestFrom(() => this.store.select(getUserId)),
      switchMap(([action, id]) => {
        if (id === null || id === undefined) {
          return of(profileUpdateFailure({ message: "Invalid user id" }));
        }
        return this.profileService.update(id, action).pipe(
          map((response) => profileUpdateSuccess(response)),
          catchError((error) =>
            of(profileUpdateFailure({ message: error.message }))
          )
        );
      })
    )
  );
}
