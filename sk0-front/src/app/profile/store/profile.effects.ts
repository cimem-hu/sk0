import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { Observable, catchError, map, of, switchMap } from "rxjs";

import { ProfileService } from "../profile.service";
import {
  profileUpdateFailure,
  profileUpdateStarted,
  profileUpdateSuccess
} from "./profile.actions";
import { Store } from "@ngrx/store";
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
      concatLatestFrom(
        () => this.store.select(getUserId) as Observable<number>
      ),
      switchMap(([action, id]) => {
        if (id === null) {
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
