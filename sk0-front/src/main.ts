import { enableProdMode, importProvidersFrom, isDevMode } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { RouteReuseStrategy, provideRouter } from "@angular/router";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { provideStore } from "@ngrx/store";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { JWT_OPTIONS, JwtModule } from "@auth0/angular-jwt";
import { IonicStorageModule } from "@ionic/storage-angular";

import { routes } from "./app/app.routes";
import { AppComponent } from "./app/app.component";
import { environment } from "./environments/environment";
import { provideServiceWorker } from "@angular/service-worker";
import { provideEffects } from "@ngrx/effects";
import { authStore } from "./app/auth/store/auth.reducer";
import { AuthEffects } from "./app/auth/store/auth.effects";
import { profileStore } from "./app/profile/store/profile.reducer";
import { ProfileEffects } from "./app/profile/store/profile.effects";
import { NavigationEffects } from "./app/common/store/navigation.effects";
import { StorageService } from "./app/common/services/storage.service";
import { JwtInterceptor } from "./app/common/services/jwt.interceptor";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom([
      IonicModule.forRoot({}),
      IonicStorageModule.forRoot(),
      JwtModule.forRoot({
        jwtOptionsProvider: {
          provide: JWT_OPTIONS,
          useFactory: (service: StorageService) => service,
          deps: [StorageService]
        }
      })
    ]),
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
    provideEffects(AuthEffects, ProfileEffects, NavigationEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true, deps: [StorageService] },
  ]
});
