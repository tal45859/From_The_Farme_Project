import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerToMerchantComponent } from './customer-to-merchant.component';

describe('CustomerToMerchantComponent', () => {
  let component: CustomerToMerchantComponent;
  let fixture: ComponentFixture<CustomerToMerchantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerToMerchantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerToMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
