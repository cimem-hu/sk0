import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { Store } from "@ngrx/store";

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
