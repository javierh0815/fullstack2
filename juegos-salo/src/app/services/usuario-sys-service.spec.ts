import { TestBed } from '@angular/core/testing';
import { UsuarioSysService } from './usuario-sys-service';

describe('UsuarioSysService', () => {
  let service: UsuarioSysService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsuarioSysService]
    });
    service = TestBed.inject(UsuarioSysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debería retornar el usuario si las credenciales son correctas', () => {
    const usuario = service.obtenerUsuariosSistema('admin_salo', 'Admin123');
    
    expect(usuario).toBeDefined();
    expect(usuario?.username).toBe('admin_salo');
    expect(usuario?.rol).toBe('admin');
  });

  it('debería retornar undefined si el usuario no existe', () => {
    const usuario = service.obtenerUsuariosSistema('usuario_falso', '12345');
    
    expect(usuario).toBeUndefined();
  });

  it('debería retornar undefined si la contraseña es incorrecta', () => {
    const usuario = service.obtenerUsuariosSistema('admin_salo', 'PasswordIncorrecto');
    
    expect(usuario).toBeUndefined();
  });

  it('debería ser sensible a mayúsculas en la contraseña', () => {

    const usuario = service.obtenerUsuariosSistema('admin_salo', 'admin123');
    
    expect(usuario).toBeUndefined();
  });
});