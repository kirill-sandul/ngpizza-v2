import { Component, inject, Input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { OrderProductPopupComponent } from '../order-product-popup/order-product-popup.component';
import { OrderPopupService } from '../../services/order-popup/order-popup.service';
import { IPizza } from '../../interfaces/pizza.interface';
import { IProduct } from '../../interfaces/products.interface';
import { IsPizzaPipe } from '../../pipes/is-pizza/is-pizza.pipe';

@Component({
  standalone: true,
  imports: [ButtonComponent, OrderProductPopupComponent, IsPizzaPipe],
  selector: 'app-product-widget',
  templateUrl: './product-widget.component.html',
  styleUrls: ['./product-widget.component.scss'],
  providers: []
})
export class ProductWidgetComponent {
  orderPopupService = inject(OrderPopupService);
  
  @Input({ required: true }) product: IPizza | IProduct;

  constructor() {}

  openPopup(){
    this.orderPopupService.openPopup$.next({ item: this.product })
  }
}
