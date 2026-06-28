import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authSysGuard } from './auth-sys-guard';

describe('authSysGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authSysGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
