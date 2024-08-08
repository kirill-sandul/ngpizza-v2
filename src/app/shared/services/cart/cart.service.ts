import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { connect } from 'ngxtension/connect';
import { map, Subject } from 'rxjs';
import { OrderPopupService } from '../order-popup/order-popup.service';
import { StorageService } from '../storage/storage.service';
import { IProduct } from '../../interfaces/products.interface';
import { ICartPizza, ISelectedPizza } from '../../interfaces/pizza.interface';

export interface ICartState {
  show: boolean,
  products: (ICartPizza | IProduct)[]
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private orderPopupService = inject(OrderPopupService);
  private storageService = inject(StorageService); 
  
  private _snackBar = inject(MatSnackBar);

  private state = signal<ICartState>({
    show: false,
    products: []
  })
  
  // selectors
  show = computed(() => this.state().show);
  products = computed(() => this.state().products);
  totalPrice = computed(() => this.state().products.reduce((acc, p) => acc += p.selected._basePrice! * p.selected.count!, 0));
  totalLength = computed(() => this.state().products.reduce((acc, p) => acc += p.selected.count!, 0));

  // sources
  private cartLoaded$ = this.storageService.loadCart();
  openCart$ = new Subject<void>();
  closeCart$ = new Subject<void>();
  addToCart$ = new Subject<IProduct | ICartPizza>();
  
  incrementItem$ = new Subject<number>();
  decrementItem$ = new Subject<number>();
  editItem$ = new Subject<number>();
  saveItem$ = new Subject<{ index: number, selected: ISelectedPizza }>();
  removeItem$ = new Subject<number>();

  constructor() {
    connect(this.state)
      .with(this.cartLoaded$, (_, products) => ({ products }))
      .with(this.openCart$.pipe(
        map(() => {
          this._snackBar.dismiss();
        })
      ), () => ({
        show: true
      }))
      .with(this.closeCart$, () => ({
        show: false
      }))
      .with(this.addToCart$.pipe(
        map(item => this.openAddToCartSnackbar(item)),
        map(item => {
          const modifiedItem = item;
          modifiedItem.selected.count = 1;

          return [...this.products(), modifiedItem];
        }),
        map(products => this.groupItems(products))
      ))
      .with(this.incrementItem$.pipe(
        map(index => {
          this.products()[index].selected.count!++;

          return ({});
        })
      ))
      .with(this.decrementItem$.pipe(
        map(index => {
          const currentCount = this.products()[index].selected.count!;

          if(currentCount !== 1) this.products()[index].selected.count!--;
          else this.removeItem$.next(index);

          return ({});
        })
      ))
      .with(this.editItem$.pipe(
        map(index => {
          this.orderPopupService.openPopup$.next({ fromCart: index, item: this.products()[index] });

          return ({})
        })
      ))
      .with(this.saveItem$.pipe(
        map(({ index, selected: newSelected }) => {
          const previouslySelected = this.products()[index].selected;
          
          this.products()[index].selected = {
            ...previouslySelected,
            ...newSelected
          };

          return this.products()
        }),
        map(products => this.groupItems(products))
      ))
      .with(this.removeItem$, (state, index) => ({
        products: state.products.filter((_, idx) => idx !== index)
      }));

    effect(() => {
      this.storageService.saveCart(this.products());
    });
  }

  openAddToCartSnackbar(item: IProduct | ICartPizza){
    let itemParams: string = '';

    if (item.type === 'pizza') itemParams = (item as ICartPizza).selected.size + ' см';
    else if (item.type === 'product') {
      if ((item as IProduct).capacity) itemParams = (item as IProduct).capacity + ' л';
      else itemParams = (item as IProduct).weight + ' г';
    }

    this._snackBar.open(`Добавлено: ${item.name}, ${itemParams}`, '', {
      duration: 2500,
      panelClass: 'cart-action-snackbar',
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });

    return item;
  }

  groupItems(products: (ICartPizza | IProduct)[]){
    const productsMap: { [key: string]: ICartPizza | IProduct } = {};

    for (let i = 0; i < products.length; i++) {
      const item = products[i];

      if(item.type === 'pizza'){
        let _pizza = products[i] as ICartPizza;

        const ingredientsKey = _pizza.selected.ingredients
          .map(ingredient => ingredient.name)
          .sort()
          .join(',');
        const key = `${_pizza.id}-${_pizza.selected.type}-${_pizza.selected.size}-${ingredientsKey}`;
  
        if (productsMap[key]) {
          productsMap[key].selected.count!++;
          products.splice(i, 1);
          i--; 
        } else {
          productsMap[key] = { ..._pizza };
        }
      }

      if(item.type === 'product'){
        const _product = products[i] as IProduct;

        const key = `${_product.name}`;

        if (productsMap[key]) {
          productsMap[key].selected.count!++;
          products.splice(i, 1);
          i--;
        } else {
          productsMap[key] = { ..._product };
        }
      }
    }

    return ({ products: Object.values(productsMap) });
  }
}
