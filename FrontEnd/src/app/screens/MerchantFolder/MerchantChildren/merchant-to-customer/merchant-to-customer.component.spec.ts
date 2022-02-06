import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantToCustomerComponent } from './merchant-to-customer.component';

describe('MerchantToCustomerComponent', () => {
  let component: MerchantToCustomerComponent;
  let fixture: ComponentFixture<MerchantToCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantToCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantToCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
