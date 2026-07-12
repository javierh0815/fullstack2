import { TestBed } from '@angular/core/testing';
import { ProductoService } from './producto-service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';

describe('ProductoService', () => {
  let service: ProductoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductoService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(ProductoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería filtrar productos correctamente por categoriaId', async () => {
    const mockProductos = [
      { id: 1, categoriaId: 1, nombre: 'Juego A' },
      { id: 2, categoriaId: 1, nombre: 'Juego B' },
      { id: 3, categoriaId: 2, nombre: 'Juego C' }
    ];


    const promise = firstValueFrom(service.obtenerProductoPorCat(1));


    const req = httpMock.expectOne('http://localhost:3000/productos');
    expect(req.request.method).toBe('GET');
    

    req.flush(mockProductos);

    const result = await promise;
    expect(result.length).toBe(2);
    expect(result.every(p => p.categoriaId === 1)).toBe(true);
  });
});