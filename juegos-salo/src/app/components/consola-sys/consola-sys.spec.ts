import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ConsolaSys } from './consola-sys';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

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


    vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key: string) => {
      if (key === 'usuarioActualSys') return JSON.stringify({ username: 'admin', rol: 'admin' });
      if (key === 'todasLasCompras') return '[]';
      return null;
    });

    fixture = TestBed.createComponent(ConsolaSys);
    component = fixture.componentInstance;
    

    fixture.detectChanges();


    const pendingRequests = httpMock.match(req => req.url.startsWith('http://localhost:3000/'));
    

    pendingRequests.forEach(req => req.flush([]));
    
    await fixture.whenStable();
  });

  afterEach(() => {

    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});