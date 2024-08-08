import { Component, computed, inject } from "@angular/core";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AutoAnimateModule } from "../../shared/utils/auto-animate.module";
import { FilterSelectComponent } from '../../components/filter-select/filter-select.component';
import { ProductWidgetComponent } from "../../shared/components/product-widget/product-widget.component";
import { OrderProductPopupComponent } from "../../shared/components/order-product-popup/order-product-popup.component";
import { CartComponent } from "../../components/cart/cart.component";
import { PizzaService } from "../../shared/services/pizza/pizza.service";
import { OrderPopupService } from "../../shared/services/order-popup/order-popup.service";
import { CartService } from "../../shared/services/cart/cart.service";
import { FilteredProductsPipe } from "../../shared/pipes/filtered-products/filtered-products.pipe";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductWidgetComponent,
    OrderProductPopupComponent,
    CartComponent,
    AutoAnimateModule,
    MatProgressBarModule,
    FilterSelectComponent,
    FilteredProductsPipe,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  pizzaService = inject(PizzaService)
  orderPopupService = inject(OrderPopupService);
  cartService = inject(CartService);

  pizzas = computed(() => this.pizzaService.pizzas());
  breakfast = computed(() => this.pizzaService.breakfast());
  snacks = computed(() => this.pizzaService.snacks());
  cocktails = computed(() => this.pizzaService.cocktails());

  constructor(){}
}
