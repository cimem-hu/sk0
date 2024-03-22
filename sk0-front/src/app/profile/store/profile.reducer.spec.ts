import {
  LoginRequest,
  LoginResponse,
  loginSuccess
} from "../../auth/store/auth.actions";
import {
  profileUpdateFailure,
  profileUpdateStarted,
  profileUpdateSuccess
} from "./profile.actions";
import { ProfileState, profileStore } from "./profile.reducer";

describe("Profile Reducers", () => {
  const initialProfileState: ProfileState = {
    error: null,
    user: null,
    isLoading: false
  } as const;

  const loginRequest: LoginRequest = {
    email: "user@email.com",
    password: "MockPassword123"
  } as const;

  const loginResponse: LoginResponse = {
    id: 1,
    name: "User",
    email: "user@email.com",
    token: "SomeValidToken"
  } as const;

  it("should handle loginSuccess action", () => {
    const action = loginSuccess(loginResponse);

    const updatedState = profileStore(initialProfileState, action);

    expect(updatedState).toStrictEqual({
      ...initialProfileState,
      user: {
        ...loginResponse,
        type: loginSuccess.type
      }
    });
  });

  it("should handle profileUpdateStarted action", () => {
    const action = profileUpdateStarted(loginRequest);

    const updatedState = profileStore(initialProfileState, action);

    expect(updatedState).toStrictEqual({
      ...initialProfileState,
      isLoading: true
    });
  });

  it("should handle profileUpdateSuccess action", () => {
    const action = profileUpdateSuccess(loginResponse);

    const updatedState = profileStore(initialProfileState, action);

    expect(updatedState).toStrictEqual({
      ...initialProfileState,
      user: {
        ...loginResponse,
        type: profileUpdateSuccess.type
      }
    });
  });

  it("should handle profileFailure action", () => {
    const error = { message: "Test Error" } as const;
    const action = profileUpdateFailure(error);

    const updatedState = profileStore(initialProfileState, action);

    expect(updatedState).toStrictEqual({
      ...initialProfileState,
      error: error.message
    });
  });
});
