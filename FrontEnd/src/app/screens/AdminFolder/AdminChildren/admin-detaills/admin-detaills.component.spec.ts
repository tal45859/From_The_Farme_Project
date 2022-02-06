import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDetaillsComponent } from './admin-detaills.component';

describe('AdminDetaillsComponent', () => {
  let component: AdminDetaillsComponent;
  let fixture: ComponentFixture<AdminDetaillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDetaillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDetaillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
