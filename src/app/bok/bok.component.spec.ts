import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BokComponent } from './bok.component';

describe('BokComponent', () => {
  let component: BokComponent;
  let fixture: ComponentFixture<BokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BokComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
