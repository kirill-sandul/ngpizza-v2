import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { LowerCasePipe } from '@angular/common';
import { ICartPizza } from '../../interfaces/pizza.interface';
import { IProduct } from '../../interfaces/products.interface';
import { PizzaPropPipe } from '../../pipes/pizza-prop/pizza-prop.pipe';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [MatIcon, LowerCasePipe, PizzaPropPipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
  @Input({ required: true }) product: ICartPizza | IProduct;
  @Output() increment = new EventEmitter();
  @Output() decrement = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() remove = new EventEmitter();

  isCartPizza(product: ICartPizza | IProduct): product is ICartPizza {
    return (product as ICartPizza).type === 'pizza';
  }

  _edit(){
    if(this.isCartPizza(this.product)) return this.edit.emit();
  }

  getProductPrice(product: ICartPizza | IProduct){
    return product.selected._basePrice! * product.selected.count!;
  }
}
