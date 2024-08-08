import { Component, EventEmitter, inject, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LowerCasePipe } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { AutoAnimateModule } from '../../shared/utils/auto-animate.module';
import { CartItemComponent } from '../../shared/components/cart-item/cart-item.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { CartService } from '../../shared/services/cart/cart.service';
import { PizzaPropPipe } from '../../shared/pipes/pizza-prop/pizza-prop.pipe';
import { TotalItemsPipe } from '../../shared/pipes/total-items/total-items.pipe';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    MatIconModule,
    CartItemComponent,
    ButtonComponent,
    NgScrollbarModule,
    AutoAnimateModule,
    PizzaPropPipe,
    LowerCasePipe,
    TotalItemsPipe
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CartComponent implements OnInit {
  cartService = inject(CartService);

  @Output() onClose = new EventEmitter<void>();

  wrapperAnim: boolean = false;
  
  ngOnInit() {
    setTimeout(() => this.wrapperAnim = true, 20);
  }

  incrementProduct(index: number){
    this.cartService.incrementItem$.next(index);
  }

  decrementProduct(index: number) {
    this.cartService.decrementItem$.next(index);
  }

  editProduct(index: number){
    this.cartService.editItem$.next(index);
  }

  removeProduct(index: number){
    this.cartService.removeItem$.next(index);
  }

  close(e: any) {
    const in_close_zone = e.target.className.includes('close-zone');

    if (in_close_zone) {
      this.wrapperAnim = false;
      setTimeout(() => this.onClose.emit(), 300);
    }
  }
}
