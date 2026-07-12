import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ConsolaSys } from './consola-sys';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('ConsolaSys', () => {
  let component: ConsolaSys;
  let fixture: ComponentFixture<ConsolaSys>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsolaSys],
      providers: [
        provideRouter([{ path: 'login-sys', component: class {} }]),
        provideHttpClient(),           
        provideHttpClientTesting()     
      ]
    }).compileComponents();


    httpMock = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(ConsolaSys);
    component = fixture.componentInstance;
    

    const req = httpMock.expectOne('http://localhost:3000/usuariosSys');
    req.flush([]);
    
    await fixture.whenStable();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});