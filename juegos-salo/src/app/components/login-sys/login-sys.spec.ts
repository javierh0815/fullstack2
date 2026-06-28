import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSys } from './login-sys';

describe('LoginSys', () => {
  let component: LoginSys;
  let fixture: ComponentFixture<LoginSys>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginSys],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginSys);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
