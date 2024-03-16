import { Injectable } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap, withLatestFrom } from "rxjs";

import { ProfileService } from "../profile.service";
import { profileUpdateStarted } from "./profile.actions";
import { Store } from "@ngrx/store";
import { AppStore } from "src/app/app.store";
import { getUserId } from "src/app/auth/store/auth.selectors";

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly profileService: ProfileService,
    private readonly store: Store<AppStore>

    // private readonly navCtl: NavController
  ) {}

  handleUpdateProfileEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileUpdateStarted),
      concatLatestFrom((action) => this.store.select(getUserId)),
      tap([a, b] => {})
      // tap(([action, id]) =>
      //   mergeMap((action) =>
      //     this.profileService.update(id, action).pipe(
      //       map((response) => loginSuccess(response)),
      //       catchError((error) => of(loginFailure({ message: error.message })))
      //     )
      //   )
      // )
    )
  );
}
