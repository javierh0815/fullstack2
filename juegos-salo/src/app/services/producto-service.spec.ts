import { TestBed } from '@angular/core/testing';
import { ProductoService } from './producto-service';

describe('ProductoService', () => {
  let service: ProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductoService]
    });
    service = TestBed.inject(ProductoService);
  });

  it('debería filtrar productos correctamente por categoriaId', () => {

    const productosCat1 = service.obtenerProductoPorCat(1);
    
    expect(productosCat1.length).toBe(3);
    expect(productosCat1.every(p => p.categoriaId === 1)).toBe(true);
  });

  it('debería retornar un array vacío si la categoría no existe', () => {
    const productosInexistentes = service.obtenerProductoPorCat(99);
    
    expect(productosInexistentes.length).toBe(0);
  });

  it('debería retornar solo los productos que tienen precioAnterior', () => {
    const productosDescuento = service.obtenerProductoDescuento();
    

    expect(productosDescuento.length).toBe(4);
    expect(productosDescuento.every(p => p.precioAnterior !== undefined)).toBe(true);
  });
});