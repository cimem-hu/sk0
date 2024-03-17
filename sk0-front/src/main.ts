import { enableProdMode, importProvidersFrom, isDevMode } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { RouteReuseStrategy, provideRouter } from "@angular/router";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { provideHttpClient } from "@angular/common/http";
import { provideStore } from "@ngrx/store";

import { routes } from "./app/app.routes";
import { AppComponent } from "./app/app.component";
import { environment } from "./environments/environment";
import { provideServiceWorker } from "@angular/service-worker";
import { provideEffects } from "@ngrx/effects";
import { authStore } from "./app/auth/store/auth.reducer";
import { AuthEffects } from "./app/auth/store/auth.effects";
import { profileStore } from "./app/profile/store/profile.reducer";
import { ProfileEffects } from "./app/profile/store/profile.effects";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom([IonicModule.forRoot({})]),
    provideRouter(routes),
    provideServiceWorker("ngsw-worker.js", {
      enabled: !isDevMode(),
      registrationStrategy: "registerWhenStable:30000"
    }),
    provideStore(
      { auth: authStore, profile: profileStore },
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true
        }
      }
    ),
    provideEffects(AuthEffects, ProfileEffects)
  ]
});
