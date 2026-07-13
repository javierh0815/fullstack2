import { TestBed } from '@angular/core/testing';
import { CarritoService } from './carrito-service';
import { UsuarioService } from './usuario-service';
import { vi } from 'vitest';

describe('CarritoService', () => {
  let service: CarritoService;
  let usuarioServiceSpy: any;

  beforeEach(() => {

    localStorage.clear();


    usuarioServiceSpy = {
      obtenerUsuarioActual: vi.fn().mockReturnValue({ username: 'testuser' })
    };

    TestBed.configureTestingModule({
      providers: [
        CarritoService,
        { provide: UsuarioService, useValue: usuarioServiceSpy }
      ]
    });
    service = TestBed.inject(CarritoService);
  });

  it('debería agregar un producto al carrito y limpiar el precio', () => {
    const producto = { id: 1, nombre: 'Juego Pro', precio: '1.200' }; 
    service.agregarProducto(producto);

    const carrito = service.obtenerCarritoUsuario();
    
    expect(carrito.length).toBe(1);
    expect(carrito[0].nombre).toBe('Juego Pro');
    expect(carrito[0].precio).toBe(1200); 
    expect(carrito[0].usuario).toBe('testuser');
  });

  it('no debería agregar producto si no hay usuario logueado', () => {

    usuarioServiceSpy.obtenerUsuarioActual.mockReturnValue(null);
    

    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    service.agregarProducto({ id: 1, nombre: 'Juego' });

    expect(service.obtenerCarritoUsuario().length).toBe(0);
    expect(alertSpy).toHaveBeenCalled();
  });

  it('debería agregar productos al carrito local sin ID asignado', () => {
    const producto = { id: 1, nombre: 'Juego', precio: 1000 };
    service.agregarProducto(producto);
    
    const carrito = service.obtenerCarritoUsuario();
  
    expect(carrito[0].id).toBeUndefined(); 
    expect(carrito[0].nombre).toBe('Juego');
  });


});