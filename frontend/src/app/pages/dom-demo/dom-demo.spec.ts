import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomDemo } from './dom-demo';

describe('DomDemo', () => {
  let component: DomDemo;
  let fixture: ComponentFixture<DomDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DomDemo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
