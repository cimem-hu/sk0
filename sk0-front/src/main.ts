import { enableProdMode, importProvidersFrom, isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { provideHttpClient } from "@angular/common/http";

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideServiceWorker } from '@angular/service-worker';
import { provideStore } from '@ngrx/store';
import { authStore } from './app/auth/store/auth.reducer';
import { provideEffects } from '@ngrx/effects';
import { asRecods } from './app/auth/store/auth.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools'

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom([IonicModule.forRoot({})]),
    provideStore({ auth: authStore }),
    provideEffects(asRecods),
    provideRouter(routes),
    provideStoreDevtools({
      maxAge: 60,
      autoPause: true,
      logOnly: !isDevMode(),
    }),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
});
