import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProductPopupComponent } from './order-product-popup.component';

describe('OrderProductPopupComponent', () => {
  let component: OrderProductPopupComponent;
  let fixture: ComponentFixture<OrderProductPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderProductPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderProductPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
