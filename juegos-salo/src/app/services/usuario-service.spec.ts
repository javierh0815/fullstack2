import { TestBed } from '@angular/core/testing';
import { UsuarioService } from './usuario-service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Usuario } from '../models/usuario';
import { firstValueFrom } from 'rxjs';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let httpMock: HttpTestingController;


  const usuarioMock: Usuario = {
    id: 1, 
    username: 'testuser',
    password: '123',
    nombre: 'Test User',
    email: 'test@test.com',
    fechaNacimiento: '1990-01-01',
    direccion: 'Calle Falsa 123',
    confirmPassword: '123'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsuarioService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(UsuarioService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería inicializar correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debería guardar un usuario y poder obtenerlo', async () => {
    const promise = firstValueFrom(service.guardar(usuarioMock));
    
    const req = httpMock.expectOne('http://localhost:3000/usuarios');
    expect(req.request.method).toBe('POST');
  
    req.flush(usuarioMock);

    await promise;

    const promiseGet = firstValueFrom(service.obtenerTodos());
    const reqGet = httpMock.expectOne('http://localhost:3000/usuarios');
    reqGet.flush([usuarioMock]);

    const todos = await promiseGet;
    expect(todos.length).toBe(1);
    expect(todos[0].id).toBe(1); 
    expect(todos[0].username).toBe('testuser');
  });

  it('debería retornar true si el usuario existe', async () => {
    const promise = firstValueFrom(service.existe('testuser'));
    
    const req = httpMock.expectOne('http://localhost:3000/usuarios');
    req.flush([usuarioMock]); 

    const existe = await promise;
    expect(existe).toBe(true);
  });

  it('debería validar las credenciales correctamente', async () => {
    const promise = firstValueFrom(service.validarCredenciales('testuser', '123'));
    
    const req = httpMock.expectOne('http://localhost:3000/usuarios');
    req.flush([usuarioMock]); 

    const usuario = await promise;
    expect(usuario).toBeDefined();
    expect(usuario?.id).toBe(1); 
    expect(usuario?.username).toBe('testuser');
  });

  it('debería manejar el inicio de sesión', () => {
    service.iniciarSesion(usuarioMock);
    const actual = service.obtenerUsuarioActual();
    expect(actual?.id).toBe(1);
    expect(actual?.username).toBe('testuser');
  });

  it('debería cerrar sesión correctamente', () => {
    service.iniciarSesion(usuarioMock);
    service.cerrarSesion();
    expect(service.obtenerUsuarioActual()).toBeNull();
  });
});