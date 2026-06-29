import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarPerfil } from './modifica-perfil';
import { UsuarioService } from '../../services/usuario-service';

describe('ModificarPerfil', () => {
  let component: ModificarPerfil;
  let fixture: ComponentFixture<ModificarPerfil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarPerfil],
      providers: [
    { provide: UsuarioService, useValue: { obtenerUsuarioActual: () => ({ username: 'test' }), actualizar: () => true } }
  ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarPerfil);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
