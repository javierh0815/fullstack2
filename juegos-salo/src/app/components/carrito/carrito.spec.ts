import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarritoService } from '../../services/carrito-service';
import { CarritoComponent } from './carrito';
import { of } from 'rxjs';

describe('CarritoComponent', () => {
  let component: CarritoComponent;
  let fixture: ComponentFixture<CarritoComponent>;
  let carritoServiceSpy: any;

  beforeEach(async () => {

    carritoServiceSpy = {
      obtenerCarrito: vi.fn().mockReturnValue(of([])), 

    };

    await TestBed.configureTestingModule({
      imports: [CarritoComponent],
      providers: [
        { provide: CarritoService, useValue: carritoServiceSpy } 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CarritoComponent);
    component = fixture.componentInstance;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});