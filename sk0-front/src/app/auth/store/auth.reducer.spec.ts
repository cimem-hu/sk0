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
  const initialAuthState: AuthState = {
    isLoading: false,
    token: null,
    error: null
  } as const;

  const loginRequest: LoginRequest = {
    email: "test@email.com",
    password: "MockPassword123"
  } as const;

  const loginResponse: LoginResponse = {
    id: 1,
    name: "User",
    email: "user@email.com",
    token: "SomeValidToken"
  } as const;

  const registerRequest: RegisterRequest = {
    name: "User",
    email: "test@email.com",
    password: "MockPassword123"
  } as const;

  const registerResponse: RegisterResponse = {
    id: 1,
    name: "User",
    email: "user@email.com",
    password: "MockPassword123"
  };

  const error = { message: "Test Error" } as const;

  it("should handle loginStarted action", () => {
    const action = loginStarted(loginRequest);

    const updatedState = authStore(initialAuthState, action);

    expect(updatedState).toStrictEqual({
      ...initialAuthState,
      isLoading: true
    });
  });

  it("should handle loginSuccess action", () => {
    const action = loginSuccess(loginResponse);

    const updatedState = authStore(initialAuthState, action);

    expect(updatedState).toStrictEqual({
      ...initialAuthState,
      token: action.token
    });
  });

  it("should handle loginFailure action", () => {
    const action = loginFailure(error);

    const updatedState = authStore(initialAuthState, action);

    expect(updatedState).toStrictEqual({
      ...initialAuthState,
      error: error.message
    });
  });

  it("should handle registerStarted action", () => {
    const action = registerStarted(registerRequest);

    const updatedState = authStore(initialAuthState, action);

    expect(updatedState).toStrictEqual({
      ...initialAuthState,
      isLoading: true
    });
  });

  it("should handle registerSucces action", () => {
    const action = registerSuccess(registerResponse);

    const updatedState = authStore(initialAuthState, action);

    expect(updatedState).toStrictEqual({ ...initialAuthState });
  });

  it("should handle registerFailure action", () => {
    const error = { message: "Test Error" } as const;
    const action = registerFailure(error);

    const updatedState = authStore(initialAuthState, action);

    expect(updatedState).toStrictEqual({
      ...initialAuthState,
      error: error.message
    });
  });

  it("should handle logout action", () => {
    const startingState: AuthState = {
      isLoading: false,
      error: null,
      token: "SomeToken"
    } as const;
    const action = logoutAction();

    const updatedState = authStore(startingState, action);

    expect(updatedState).toStrictEqual(initialAuthState);
  });
});
