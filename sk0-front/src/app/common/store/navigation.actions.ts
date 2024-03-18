import { createAction } from "@ngrx/store";

const navigateBackToLoginAction = createAction("[Navigate] Back to Login");
const navigateToRegisterAction = createAction("[Navigate] Forward to Register");
const navigateBackToHome = createAction("[Navigate] Back to Home");
const navigateToProfile = createAction("[Navigate] Forward to Profile");
export {
  navigateBackToHome,
  navigateBackToLoginAction,
  navigateToRegisterAction,
  navigateToProfile
};
