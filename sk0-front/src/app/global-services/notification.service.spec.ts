import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import { expect, jest } from '@jest/globals';

describe('NotificationService', () => {
  let notificationService: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    notificationService = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(notificationService).toBeTruthy();
  });

  it('should be called with specified message and position', () => {
    const message = 'Toast message';
    const position = 'top';
    const toastSpy = jest.spyOn(notificationService, 'toastMessage');
    notificationService.toastMessage(message, position);
    expect(toastSpy).toBeCalled();
    expect(toastSpy).toBeCalledWith(message, position);
  });
});
