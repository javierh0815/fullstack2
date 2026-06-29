import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarritoService } from '../../services/carrito-service';
import { CarritoComponent } from './carrito';

describe('CarritoComponent', () => { 
  let component: CarritoComponent;
  let fixture: ComponentFixture<CarritoComponent>;

  beforeEach(async () => {

    const carritoServiceMock = {
      obtenerCarritoUsuario: () => [] 
    };

    await TestBed.configureTestingModule({
      imports: [CarritoComponent],
      providers: [
        { provide: CarritoService, useValue: carritoServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});