import { TestBed } from "@angular/core/testing";
import { expect, jest } from "@jest/globals";

import { NotificationService } from "./notification.service";

describe("NotificationService", () => {
  let notificationService: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    notificationService = TestBed.inject(NotificationService);
  });

  it("should be created", () => {
    expect(notificationService).toBeTruthy();
  });

  it("should be called with specified message and position", () => {
    const message = "Toast message";
    const position = "top";
    const toastSpy = jest.spyOn(notificationService, "toastMessage");
    notificationService.toastMessage(message, position);
    expect(toastSpy).toBeCalled();
    expect(toastSpy).toBeCalledWith(message, position);
  });

  it("should call alertSuccess with specified message", async () => {
    const message = "Success message";
    const alertSuccessSpy = jest.spyOn(notificationService, "alertSuccess");
    notificationService.alertSuccess(message);
    expect(alertSuccessSpy).toHaveBeenCalled();
    expect(alertSuccessSpy).toHaveBeenCalledWith(message);
  });

  it("should call alertError with specified message", async () => {
    const message = "Error message";
    const alertErrorSpy = jest.spyOn(notificationService, "alertError");
    notificationService.alertError(message);
    expect(alertErrorSpy).toHaveBeenCalled();
    expect(alertErrorSpy).toHaveBeenCalledWith(message);
  });
});
