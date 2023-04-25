import { TestBed } from '@angular/core/testing';

import { CustomErrorHandlerLogService } from './custom-error-handler-log.service';

describe('CustomErrorHandlerService', () => {
  let service: CustomErrorHandlerLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomErrorHandlerLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
