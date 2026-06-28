import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolaSys } from './consola-sys';

describe('ConsolaSys', () => {
  let component: ConsolaSys;
  let fixture: ComponentFixture<ConsolaSys>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsolaSys],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsolaSys);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
