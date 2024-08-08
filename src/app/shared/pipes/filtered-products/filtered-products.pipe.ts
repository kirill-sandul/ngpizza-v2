import { Pipe, PipeTransform } from '@angular/core';
import { IPizza } from '../../interfaces/pizza.interface';
import { IProduct } from '../../interfaces/products.interface';
import { IFilter } from '../../interfaces/filter.interface';

@Pipe({
  name: 'filteredProducts',
  standalone: true
})
export class FilteredProductsPipe implements PipeTransform {
  transform(productsArr: (IPizza | IProduct)[], filterName: IFilter | null) {
    if (filterName === 'price') return this.filterByPrice(productsArr);
    else if (filterName === 'rating') return this.filterByRating(productsArr);
    else if (filterName === 'alphabet') return this.filterByAlphabet(productsArr);

    return productsArr;
  }

  filterByPrice(products: (IPizza | IProduct)[]) {
    return products.sort((a, b) => {
      if (a.type === "pizza" && b.type === "pizza") return (a as IPizza).prices[0] - (b as IPizza).prices[0];
      else return (a as IProduct).price - (b as IProduct).price;
    });
  }

  filterByRating(products: (IPizza | IProduct)[]) {
    return products.sort((a, b) => b.rating - a.rating);
  }

  filterByAlphabet(products: (IPizza | IProduct)[]) {
    return products.sort((a, b) => a.name.localeCompare(b.name));
  }

}
