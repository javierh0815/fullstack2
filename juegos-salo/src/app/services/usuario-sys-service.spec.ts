import { TestBed } from '@angular/core/testing';
import { UsuarioSysService } from './usuario-sys-service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('UsuarioSysService', () => {
  let service: UsuarioSysService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsuarioSysService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(UsuarioSysService);
    
    (service as any).usuariosSistema = [
      { username: 'admin_salo', password: 'Admin123', rol: 'admin' },
      { username: 'reporte_salo', password: 'Reporte123', rol: 'reporte' }
    ];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debería retornar true si las credenciales son correctas', () => {
    const resultado = service.iniciarSesion('admin_salo', 'Admin123');
    
    expect(resultado).toBe(true);
    expect(localStorage.getItem('usuarioActualSys')).toBeDefined();
  });

  it('debería retornar false si el usuario no existe', () => {
    const resultado = service.iniciarSesion('usuario_falso', '12345');
    expect(resultado).toBe(false);
  });

  it('debería retornar false si la contraseña es incorrecta', () => {
    const resultado = service.iniciarSesion('admin_salo', 'PasswordIncorrecto');
    expect(resultado).toBe(false);
  });

  it('debería ser sensible a mayúsculas en la contraseña', () => {
    const resultado = service.iniciarSesion('admin_salo', 'admin123');
    expect(resultado).toBe(false);
  });
});