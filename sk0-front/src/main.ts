import { enableProdMode, importProvidersFrom, isDevMode } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { RouteReuseStrategy, provideRouter } from "@angular/router";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { provideHttpClient } from "@angular/common/http";

import { routes } from "./app/app.routes";
import { AppComponent } from "./app/app.component";
import { environment } from "./environments/environment";
import { provideServiceWorker } from "@angular/service-worker";
import { JwtHelperService } from "@auth0/angular-jwt";
import { JWT_OPTIONS } from "@auth0/angular-jwt";

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
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }
  ]
});
