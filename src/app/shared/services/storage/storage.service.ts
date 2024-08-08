import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IProduct } from '../../interfaces/products.interface';
import { ICartPizza } from '../../interfaces/pizza.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private key = 'savedCart';

  loadCart(): Observable<(IProduct | ICartPizza)[]> {
    const savedCart = localStorage.getItem(this.key);

    return of(savedCart ? JSON.parse(savedCart) : []);
  }

  saveCart(products: (IProduct | ICartPizza)[]){
    localStorage.setItem(this.key, JSON.stringify(products));
  }
}
