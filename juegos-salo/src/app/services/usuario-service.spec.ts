import { UsuarioService } from './usuario-service';
import { Usuario } from '../models/usuario'; 

describe('UsuarioService', () => {
  let service: UsuarioService;

  const usuarioMock: Usuario = {
    username: 'testuser',
    password: '123',
    nombre: 'Test User',
    email: 'test@test.com',
    fechaNacimiento: '1990-01-01',
    direccion: 'Calle Falsa 123',
    confirmPassword: '123'
  };

  beforeEach(() => {
    service = new UsuarioService();
    localStorage.clear();
  });

  it('debería inicializar correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debería guardar un usuario y poder obtenerlo', () => {
    service.guardar(usuarioMock);
    
    const todos = service.obtenerTodos();
    expect(todos.length).toBe(1);
    expect(todos[0].username).toBe('testuser');
  });

  it('debería guardar un usuario incluso si no tiene confirmPassword', () => {

    const usuarioSinConfirm: Usuario = {
      username: 'user2',
      password: '456',
      nombre: 'User 2',
      email: 'user2@test.com',
      fechaNacimiento: '1995-05-05',
      direccion: 'Av. Siempre Viva 456'
    };

    service.guardar(usuarioSinConfirm);
    const todos = service.obtenerTodos();
    expect(todos.length).toBe(1);
    expect(todos[0].username).toBe('user2');
    expect(todos[0].confirmPassword).toBeUndefined();
  });

  it('debería retornar true si el usuario existe', () => {
    service.guardar(usuarioMock);
    
    const resultado = service.existe('testuser');
    expect(resultado).toBe(true);
  });

  it('debería validar las credenciales correctamente', () => {
    service.guardar(usuarioMock);

    const usuario = service.validarCredenciales('testuser', '123');
    expect(usuario).toBeDefined();
    expect(usuario?.username).toBe('testuser');
  });

  it('debería manejar el inicio de sesión', () => {
    service.iniciarSesion(usuarioMock);
    
    const actual = service.obtenerUsuarioActual();
    expect(actual.username).toBe('testuser');
  });

  it('debería cerrar sesión correctamente', () => {
    service.iniciarSesion(usuarioMock);

    service.cerrarSesion();
    expect(service.obtenerUsuarioActual()).toBeNull();
  });
});