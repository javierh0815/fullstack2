import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaUsuario } from './cuenta-usuario';
import { provideRouter } from '@angular/router';

describe('CuentaUsuario', () => {
  let component: CuentaUsuario;
  let fixture: ComponentFixture<CuentaUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuentaUsuario],
      providers: [
        provideRouter([
          {path: 'login', component: class {} }
        ])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CuentaUsuario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
