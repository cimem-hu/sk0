import { Routes } from "@angular/router";
import { authGuard } from "./guards/auth.guard";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "home",
    canActivate: [authGuard],
    loadComponent: () => import("./home/home.page").then((m) => m.HomePage)
  },
  {
    path: "login",
    loadComponent: () =>
      import("./auth/login/login.page").then((m) => m.LoginPage)
  },
  {
    path: "register",
    loadComponent: () =>
      import("./auth/register/register.page").then((m) => m.RegisterPage)
  },
  {
    path: "profile",
    canActivate: [authGuard],
    loadComponent: () =>
      import("./profile/profile.page").then((m) => m.ProfilePage)
  }
];
