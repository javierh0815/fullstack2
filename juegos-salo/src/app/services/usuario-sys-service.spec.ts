import { TestBed } from '@angular/core/testing';

import { UsuarioSysService } from './usuario-sys-service';

describe('UsuarioSysService', () => {
  let service: UsuarioSysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioSysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
