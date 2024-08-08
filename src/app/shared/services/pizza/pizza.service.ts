import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, map, merge, Subject } from 'rxjs';
import { connect } from 'ngxtension/connect';
import { IProduct, IProducts } from '../../interfaces/products.interface';
import { IPizza } from '../../interfaces/pizza.interface';
import { IFilter } from '../../interfaces/filter.interface';

export interface PizzasState {
  products: IProducts,
  selectedFilter: IFilter | null,
  loaded: boolean,
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  private http = inject(HttpClient);
  
  private state = signal<PizzasState>({
    products: [],
    selectedFilter: null,
    loaded: false,
    error: null
  })

  // selectors
  pizzas = computed((): IPizza[] =>
    this.state().products.filter(((p): p is IPizza => p._category === 'pizza')
  ));
  
  breakfast = computed((): IProduct[] =>
    this.state().products.filter(((p): p is IProduct => p._category === 'breakfast')
  ));
  snacks = computed((): IProduct[] =>
    this.state().products.filter(((p): p is IProduct => p._category === 'snacks')
  ));
  cocktails = computed((): IProduct[] =>
    this.state().products.filter(((p): p is IProduct => p._category === 'cocktails')
  ));

  selectedFilter = computed(() => this.state().selectedFilter);

  productsLoaded = computed(() => this.state().loaded);

  // sources
  productsLoaded$ = this.http.get<IProducts>('http://localhost:3000/products').pipe(
    catchError(err => {
      this.error$.next(err);
      return EMPTY;
    })
  )
  selectFilter$ = new Subject<IFilter | null>();

  private error$ = new Subject<string>();
  
  constructor() {
    const nextState$ = merge(
      this.productsLoaded$.pipe(
        map(products => ({ products, loaded: true }))
      ),
      this.error$.pipe(map(error => ({ error })))
    );

    connect(this.state)
      .with(nextState$)
      .with(this.selectFilter$, (_, filterName) => ({ selectedFilter: filterName }));
  }
}
