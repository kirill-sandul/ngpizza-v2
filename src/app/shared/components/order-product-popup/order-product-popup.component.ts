import { Component, EventEmitter, inject, OnInit, Output, ViewEncapsulation, computed } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LowerCasePipe } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ClickOutside } from 'ngxtension/click-outside';
import { AutoAnimateModule } from '../../utils/auto-animate.module';
import { OrderPopupService } from '../../services/order-popup/order-popup.service';
import { CartService } from '../../services/cart/cart.service';
import { ButtonComponent } from '../button/button.component';
import { IProduct } from '../../interfaces/products.interface';
import { Ingredient } from '../../interfaces/ingredient.interface';
import { ICartPizza, IPizza } from '../../interfaces/pizza.interface';
import { PizzaPropPipe } from '../../pipes/pizza-prop/pizza-prop.pipe';
import { IsPizzaPipe } from '../../pipes/is-pizza/is-pizza.pipe';

interface ISelectedPizza {
  size: number,
  type: number,
  ingredients: Ingredient[],
  price: Function,
}

@Component({
  selector: 'app-order-product-popup',
  standalone: true,
  imports: [
    NgScrollbarModule,
    MatIconModule,
    AutoAnimateModule,
    ButtonComponent,
    IsPizzaPipe,
    PizzaPropPipe,
    LowerCasePipe,
    ClickOutside
  ],
  templateUrl: './order-product-popup.component.html',
  styleUrl: './order-product-popup.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class OrderProductPopupComponent implements OnInit {
  orderPopupService = inject(OrderPopupService);
  cartService = inject(CartService);
  
  product = this.orderPopupService.product()!;
  fromCart = this.orderPopupService.fromCart();
  ingredients = computed(() => this.orderPopupService.ingredients());  
  
  @Output() onClose = new EventEmitter<void>();

  selectedPizza: ISelectedPizza = {
    size: (this.orderPopupService.product() as ICartPizza).selected?.size || 30,
    type: (this.orderPopupService.product() as ICartPizza).selected?.type || 0,

    ingredients: (this.orderPopupService.product() as ICartPizza).selected?.ingredients.length
      ? [...(this.orderPopupService.product() as ICartPizza).selected?.ingredients]
      : [],
    
    price: this.getPizzaPrice
  }
  wrapperAnim: boolean = false;

  ngOnInit(){
    if(this.product._category === 'pizza') this.orderPopupService.loadIngredients$.next();

    setTimeout(() => this.wrapperAnim = true, 20);
  }

  isPizza(product: IPizza | IProduct): product is IPizza {
    return product.type === 'pizza';
  }

  selectSize(size: number){
    this.selectedPizza.size = size;
    
    if(this.ifDisableType1(this.selectedPizza.type)) this.selectedPizza.type = 0;
  }

  selectType(type: number){
    if (this.ifDisableType1(type)) return;
    
    this.selectedPizza.type = type;
  }

  selectIngredient(ingredient: Ingredient){
    if (this.ifIngredientSelected(ingredient))
      return this.selectedPizza.ingredients = this.selectedPizza.ingredients.filter(i => i.name !== ingredient.name);
    
    return this.selectedPizza.ingredients.push(ingredient);
  }

  ifIngredientSelected(ingredient: Ingredient){
    return this.selectedPizza.ingredients.filter(i => i.name === ingredient.name).length;
  }

  ifDisableType1(type: number){
    return this.selectedPizza.size === 25 && type === 1;
  }

  getPizzaPrice(){
    const priceIndex = (this.product as IPizza).sizes.indexOf(this.selectedPizza.size);
    const pizzaPrice = (this.product as IPizza).prices[priceIndex];
 
    const ingredientsPrice = this.selectedPizza.ingredients.reduce((acc, cur) => acc + cur.price, 0);

    return pizzaPrice + ingredientsPrice;
  }

  addToCart(){
    if(this.fromCart !== null) return this.saveToCart();

    let item;

    if (this.product.type === 'pizza') item = {
      ...(this.product as IPizza),
      selected: {
        ...this.selectedPizza,
        _basePrice: this.getPizzaPrice()
      }
    }
    else item = {
      ...(this.product as IProduct),
      selected: {
        _basePrice: (this.product as IProduct).price
      }
    }
    
    this.cartService.addToCart$.next(item);

    this.close();
  }

  saveToCart(){      
    this.cartService.saveItem$.next({
      index: this.fromCart!,
      selected: {
        ...this.selectedPizza,
        _basePrice: this.getPizzaPrice()
      }
    });
    
    this.close();
  }
  
  close(){    
    this.wrapperAnim = false;
    setTimeout(() => this.onClose.emit(), 80);
  }
}
