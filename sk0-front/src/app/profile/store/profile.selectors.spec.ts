import { AppStore } from "../../app.store";
import {
  getUser,
  getUserName,
  getUserId,
  getUserEmail
} from "./profile.selectors";

describe("Profile Selectors", () => {
  let state: AppStore;

  beforeEach(() => {
    state = {
      profile: {
        user: {
          id: 1,
          name: "Test User",
          email: "test@test.com"
        }
      }
    } as unknown as AppStore;
  });

  it("should return the user", () => {
    const result = getUser(state);
    expect(result).toEqual(state.profile.user);
  });

  it("should return the user name", () => {
    const result = getUserName(state);
    expect(result).toEqual(state.profile.user!.name);
  });

  it("should return the user id", () => {
    const result = getUserId(state);
    expect(result).toEqual(state.profile.user!.id);
  });

  it("should return the user email", () => {
    const result = getUserEmail(state);
    expect(result).toEqual(state.profile.user!.email);
  });
});
