import { expect, jest } from "@jest/globals";

import { NotificationService } from "./notification.service";
import { AlertController, ToastController } from "@ionic/angular";

describe("NotificationService", () => {
  let notificationService: NotificationService;
  let toastController: jest.Mocked<ToastController>;
  let alertController: jest.Mocked<AlertController>;

  beforeEach(() => {
    toastController = {
      create: jest.fn().mockResolvedValue({
        present: jest.fn().mockResolvedValue(null as never)
      } as never)
    } as unknown as jest.Mocked<ToastController>;

    alertController = {
      create: jest.fn().mockResolvedValue({
        present: jest.fn().mockResolvedValue(null as never)
      } as never)
    } as unknown as jest.Mocked<AlertController>;

    notificationService = new NotificationService(
      toastController,
      alertController
    );
  });

  it("should be created", () => {
    expect(notificationService).toBeTruthy();
  });

  it("should be called with specified message and position", async () => {
    const message = "Toast message";
    const position = "top";

    await notificationService.toastMessage(message, position);

    expect(toastController.create).toHaveBeenCalledWith({
      color: "primary",
      message,
      duration: 1500,
      position
    });
    expect((await toastController.create()).present).toHaveBeenCalled();
  });

  it("should call alertSuccess with specified message", async () => {
    const message = "Alert success";

    await notificationService.alertSuccess(message);

    expect(alertController.create).toHaveBeenCalledWith({
      message,
      buttons: ["OK"]
    });
    expect((await alertController.create()).present).toHaveBeenCalled();
  });

  it("should call alertError with specified message", async () => {
    const message = "Alert success";

    await notificationService.alertError(message);

    expect(alertController.create).toHaveBeenCalledWith({
      header: "Hiba",
      message,
      buttons: ["OK"]
    });
    expect((await alertController.create()).present).toHaveBeenCalled();
  });
});
