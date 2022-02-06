import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetaillsComponent } from './customer-detaills.component';

describe('CustomerDetaillsComponent', () => {
  let component: CustomerDetaillsComponent;
  let fixture: ComponentFixture<CustomerDetaillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerDetaillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDetaillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
