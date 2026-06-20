import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaPerfil } from './modifica-perfil';

describe('ModificaPerfil', () => {
  let component: ModificaPerfil;
  let fixture: ComponentFixture<ModificaPerfil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificaPerfil],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificaPerfil);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
