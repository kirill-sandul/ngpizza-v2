import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, map, merge, Subject, switchMap, take } from 'rxjs';
import { connect } from 'ngxtension/connect';
import { ICartPizza, IPizza } from '../../interfaces/pizza.interface';
import { IProduct } from '../../interfaces/products.interface';
import { Ingredient } from '../../interfaces/ingredient.interface';

export interface OrderPopupState {
  product: IProduct | IPizza | ICartPizza | null,
  ingredients: Ingredient[],
  fromCart: number | null,
  show: boolean,
  error: string | null
}

@Injectable({
  providedIn: 'root'
})
export class OrderPopupService {
  private http = inject(HttpClient);

  private state = signal<OrderPopupState>({
    product: null,
    ingredients: [],
    fromCart: null,
    show: false,
    error: null
  })

  // selectors
  show = computed(() => this.state().show);
  product = computed(() => this.state().product);
  ingredients = computed(() => this.state().ingredients);
  fromCart = computed(() => this.state().fromCart);

  // sources
  openPopup$ = new Subject<{ fromCart?: number, item: IProduct | IPizza }>();
  closePopup$ = new Subject<void>();
  loadIngredients$ = new Subject<void>();
  private error$ = new Subject<string>();
  
  ingredientsLoaded$ = this.http.get<Ingredient[]>('http://localhost:3000/ingredients').pipe(
    catchError(err => {
      this.error$.next(err);
      return EMPTY;
    })
  )

  constructor() {
    const nextState$ = merge(
      this.ingredientsLoaded$.pipe(
        map(ingredients => ({ ingredients }))
      ),
      this.error$.pipe(map(error => ({ error })))
    );

    connect(this.state)
      .with(this.loadIngredients$.pipe(
        take(1),
        switchMap(() => nextState$))
      )
      .with(this.openPopup$, (_, { fromCart = null, item }) => ({
        product: item,
        fromCart,
        show: true
      }))
      .with(this.closePopup$, () => ({
        product: null,
        fromCart: null,
        show: false
      }))
  }
}
