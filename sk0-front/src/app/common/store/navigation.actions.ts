import { createAction } from "@ngrx/store";

const navigateToLoginAction = createAction("[Auth] Navigate to Login");
const navigateToRegisterAction = createAction("[Auth] Navigate to Register");
const navigateBackToHome = createAction("[Auth] Navigate to Home");

export { navigateBackToHome, navigateToLoginAction, navigateToRegisterAction };
