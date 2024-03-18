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
  const mockInitialProfileState: ProfileState = {
    error: null,
    user: null,
    isLoading: false
  } as const;

  const mockUserLoginRequest: LoginRequest = {
    email: "user@email.com",
    password: "MockPassword123"
  } as const;

  const mockUserLoginResponse: LoginResponse = {
    id: 1,
    name: "User",
    email: "user@email.com",
    token: "SomeValidToken"
  } as const;

  it("should handle loginSuccess action", () => {
    const action = loginSuccess(mockUserLoginResponse);

    const updatedState = profileStore(mockInitialProfileState, action);

    expect(updatedState).toStrictEqual({
      ...mockInitialProfileState,
      user: {
        ...mockUserLoginResponse,
        type: loginSuccess.type
      }
    });
  });

  it("should handle profileUpdateStarted action", () => {
    const action = profileUpdateStarted(mockUserLoginRequest);

    const updatedState = profileStore(mockInitialProfileState, action);

    expect(updatedState).toStrictEqual({
      ...mockInitialProfileState,
      isLoading: true
    });
  });

  it("should handle profileUpdateSuccess action", () => {
    const action = profileUpdateSuccess(mockUserLoginResponse);

    const updatedState = profileStore(mockInitialProfileState, action);

    expect(updatedState).toStrictEqual({
      ...mockInitialProfileState,
      user: {
        ...mockUserLoginResponse,
        type: profileUpdateSuccess.type
      }
    });
  });

  it("should handle profileFailure action", () => {
    const error = { message: "Test Error" } as const;
    const action = profileUpdateFailure(error);

    const updatedState = profileStore(mockInitialProfileState, action);

    expect(updatedState).toStrictEqual({
      ...mockInitialProfileState,
      error: error.message
    });
  });
});
