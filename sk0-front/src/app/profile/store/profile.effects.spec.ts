import { Actions } from "@ngrx/effects";
import { ProfileService } from "../profile.service";
import { ProfileEffects } from "./profile.effects";
import {
  ProfileUpdateRequest,
  profileUpdateFailure,
  profileUpdateStarted,
  profileUpdateSuccess
} from "./profile.actions";
import { of, take, throwError } from "rxjs";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import { AppStore } from "../../app.store";
import { TestBed } from "@angular/core/testing";

describe("ProfileEffects", () => {
  let profileService: jest.Mocked<ProfileService>;
  let actions$: Actions;
  let profileEffects: ProfileEffects;
  let store: MockStore<AppStore>;

  const initialState: AppStore = {
    auth: { token: null, isLoading: false, error: null },
    profile: {
      isLoading: false,
      error: null,
      user: { id: null, name: null, email: null }
    }
  };

  const mockUpdatedUser: ProfileUpdateRequest = {
    name: "Updated User",
    email: "updated@email.com",
    password: "MockPassword123"
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileEffects, provideMockStore({ initialState })]
    });

    store = TestBed.inject(MockStore);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Update", () => {
    beforeEach(() => {
      profileService = {
        update: jest.fn()
      } as unknown as jest.Mocked<ProfileService>;
      actions$ = new Actions(of(profileUpdateStarted(mockUpdatedUser)));
      profileEffects = new ProfileEffects(actions$, profileService, store);
    });

    it("should dispatch profileUpdateFailure with null id is presented", (done) => {
      const error = new Error("Invalid user id");
      const expectedAction = profileUpdateFailure({ message: error.message });

      const action = profileEffects.handleUpdateProfileEffects$;

      action.pipe(take(1)).subscribe((recievedAction) => {
        expect(recievedAction).toStrictEqual(expectedAction);
        done();
      });
    });

    it("should dispatch profileUpdateFailure with undefined id is presented", (done) => {
      const mockState: AppStore = {
        ...initialState,
        profile: { ...initialState.profile, user: null }
      };
      store.setState(mockState);
      const error = new Error("Invalid user id");
      const expectedAction = profileUpdateFailure({ message: error.message });

      const action = profileEffects.handleUpdateProfileEffects$;

      action.pipe(take(1)).subscribe((recievedAction) => {
        expect(recievedAction).toStrictEqual(expectedAction);
        done();
      });
    });

    it("should dispatch profileUpdateFailure when profileService.update throws error", (done) => {
      const mockUser = { id: 1, name: "Name", email: "original@email.com" };
      const mockState: AppStore = {
        ...initialState,
        profile: { ...initialState.profile, user: mockUser }
      };
      store.setState(mockState);
      const error = new Error("Profile update error");
      const expectedAction = profileUpdateFailure({ message: error.message });

      profileService.update.mockReturnValue(throwError(() => error));

      const action = profileEffects.handleUpdateProfileEffects$;

      action.pipe(take(1)).subscribe((recievedAction) => {
        expect(recievedAction).toStrictEqual(expectedAction);
        done();
      });
    });

    it("should dispatch profileUpdateSuccess on successful profile update", (done) => {
      const mockUser = {
        id: 1,
        name: "Name",
        email: "original@email.com"
      };
      const mockState: AppStore = {
        ...initialState,
        profile: { ...initialState.profile, user: mockUser }
      };
      store.setState(mockState);
      const expectedAction = profileUpdateSuccess(mockUser);

      profileService.update.mockReturnValue(of(mockUser));

      const action = profileEffects.handleUpdateProfileEffects$;
      action.pipe(take(1)).subscribe((recievedAction) => {
        expect(recievedAction).toStrictEqual(expectedAction);
        done();
      });
    });
  });
});
