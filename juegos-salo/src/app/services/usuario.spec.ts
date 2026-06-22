import { describe, it, expect, beforeEach } from 'vitest';

import { UsuarioService } from './usuario';

describe('UsuarioService', () => {
  let service: UsuarioService;

  beforeEach(() => {
    service = new UsuarioService();
    localStorage.clear();
  });

  it('debería inicializar correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debería guardar un usuario y poder obtenerlo', () => {
    const usuarioTest = { username: 'testuser', password: '123' };
    
    service.guardar(usuarioTest);
    
    const todos = service.obtenerTodos();
    expect(todos.length).toBe(1);
    expect(todos[0].username).toBe('testuser');
  });


  it('debería retornar true si el usuario existe', () => {
    service.guardar({username: 'juan'});
    
    const resultado = service.existe('juan');
    expect(resultado).toBe(true);
  });

  it('debería validar las credenciales correctamente', () => {
    service.guardar({username: 'ana', password: 'abc'});

    const usuario = service.validarCredenciales('ana','abc');
    expect(usuario).toBeDefined();
    expect(usuario?.username).toBe('ana');
  });

  it('debería manejar el inicio de sesión', () => {
    const usuario = {username:'luis'};
    
    service.iniciarSesion(usuario);
    
    const actual = service.obtenerUsuarioActual();
    expect(actual.username).toBe('luis');
  });

  it('debería cerrar sesión correctamente', () => {
    service.iniciarSesion({username: 'test'});

    service.cerrarSesion();
    expect(service.obtenerUsuarioActual()).toBeNull();
  });


  
});
