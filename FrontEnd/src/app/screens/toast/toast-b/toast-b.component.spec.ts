import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastBComponent } from './toast-b.component';

describe('ToastBComponent', () => {
  let component: ToastBComponent;
  let fixture: ComponentFixture<ToastBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToastBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
