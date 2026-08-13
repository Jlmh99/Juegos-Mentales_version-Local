import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AyudaSoporte } from './ayuda-soporte';

describe('AyudaSoporte', () => {
  let component: AyudaSoporte;
  let fixture: ComponentFixture<AyudaSoporte>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AyudaSoporte]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AyudaSoporte);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
