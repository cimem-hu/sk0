import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  loginFailure,
  loginStarted,
  loginSuccess,
  logoutAction,
  registerFailure,
  registerStarted,
  registerSuccess
} from "./auth.actions";
import { AuthState, authStore } from "./auth.reducer";

describe("Auth Reducers", () => {
  const mockInitialAuthState: AuthState = {
    isLoading: false,
    token: null,
    error: null
  } as const;

  const mockLoginRequest: LoginRequest = {
    email: "test@email.com",
    password: "MockPassword123"
  } as const;

  const mockUserLoginResponse: LoginResponse = {
    id: 1,
    name: "User",
    email: "user@email.com",
    token: "SomeValidToken"
  } as const;

  const mockRegisterRequest: RegisterRequest = {
    name: "User",
    email: "test@email.com",
    password: "MockPassword123"
  } as const;

  const mockRegisterResponse: RegisterResponse = {
    id: 1,
    name: "User",
    email: "user@email.com",
    password: "MockPassword123"
  };

  const error = { message: "Test Error" } as const;

  it("should handle loginStarted action", () => {
    const action = loginStarted(mockLoginRequest);

    const updatedState = authStore(mockInitialAuthState, action);

    expect(updatedState).toStrictEqual({
      ...mockInitialAuthState,
      isLoading: true
    });
  });

  it("should handle loginSuccess action", () => {
    const action = loginSuccess(mockUserLoginResponse);

    const updatedState = authStore(mockInitialAuthState, action);

    expect(updatedState).toStrictEqual({
      ...mockInitialAuthState,
      token: action.token
    });
  });

  it("should handle loginFailure action", () => {
    const action = loginFailure(error);

    const updatedState = authStore(mockInitialAuthState, action);

    expect(updatedState).toStrictEqual({
      ...mockInitialAuthState,
      error: error.message
    });
  });

  it("should handle registerStarted action", () => {
    const action = registerStarted(mockRegisterRequest);

    const updatedState = authStore(mockInitialAuthState, action);

    expect(updatedState).toStrictEqual({
      ...mockInitialAuthState,
      isLoading: true
    });
  });

  it("should handle registerSucces action", () => {
    const action = registerSuccess(mockRegisterResponse);

    const updatedState = authStore(mockInitialAuthState, action);

    expect(updatedState).toStrictEqual({ ...mockInitialAuthState });
  });

  it("should handle registerFailure action", () => {
    const error = { message: "Test Error" } as const;
    const action = registerFailure(error);

    const updatedState = authStore(mockInitialAuthState, action);

    expect(updatedState).toStrictEqual({
      ...mockInitialAuthState,
      error: error.message
    });
  });

  it("should handle logout action", () => {
    const mockStartingState: AuthState = {
      isLoading: false,
      error: null,
      token: "SomeToken"
    };
    const action = logoutAction();

    const updatedState = authStore(mockStartingState, action);

    expect(updatedState).toStrictEqual(mockInitialAuthState);
  });
});
