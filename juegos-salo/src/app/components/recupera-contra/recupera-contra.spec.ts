import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperaContra } from './recupera-contra';

describe('RecuperaContra', () => {
  let component: RecuperaContra;
  let fixture: ComponentFixture<RecuperaContra>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecuperaContra],
    }).compileComponents();

    fixture = TestBed.createComponent(RecuperaContra);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
