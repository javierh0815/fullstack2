import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginSys } from './login-sys';
import { Router } from '@angular/router';
import { UsuarioSysService } from '../../services/usuario-sys-service';

describe('LoginSys', () => {
  let component: LoginSys;
  let fixture: ComponentFixture<LoginSys>;
  

  const routerMock = { navigate: () => {} };
  const sysServiceMock = { obtenerUsuariosSistema: () => null };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginSys],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: UsuarioSysService, useValue: sysServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginSys);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});