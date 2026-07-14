import { TestBed } from '@angular/core/testing';
import { CarritoService } from './carrito-service';
import { UsuarioService } from './usuario-service';
import { JsonFile } from './json-file'; 
import { of,firstValueFrom } from 'rxjs';
import { vi } from 'vitest';

describe('CarritoService', () => {
  let service: CarritoService;
  let usuarioServiceSpy: any;
  let jsonFileSpy: any;

  beforeEach(() => {
    usuarioServiceSpy = {
      obtenerUsuarioActual: vi.fn().mockReturnValue({ username: 'testuser' })
    };

  
    jsonFileSpy = {
      post: vi.fn().mockReturnValue(of({ success: true })),
      getAll: vi.fn().mockReturnValue(of([])) 
    };

    TestBed.configureTestingModule({
      providers: [
        CarritoService,
        { provide: UsuarioService, useValue: usuarioServiceSpy },
        { provide: JsonFile, useValue: jsonFileSpy }
      ]
    });
    service = TestBed.inject(CarritoService);
  });

it('debería agregar un producto', async () => {
  const producto = { id: 1, nombre: 'Test', precio: '100' };
  
  await firstValueFrom(service.agregarProducto(producto));
  
  expect(jsonFileSpy.post).toHaveBeenCalled();
});

  it('debería lanzar error si no hay usuario logueado', () => {
    usuarioServiceSpy.obtenerUsuarioActual.mockReturnValue(null);
    

    expect(() => service.agregarProducto({ id: 1 })).toThrow();
  });
});