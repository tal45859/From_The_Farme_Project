import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantDetaillsComponent } from './merchant-detaills.component';

describe('MerchantDetaillsComponent', () => {
  let component: MerchantDetaillsComponent;
  let fixture: ComponentFixture<MerchantDetaillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantDetaillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantDetaillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
