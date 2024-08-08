import { Pipe, PipeTransform } from '@angular/core';
import { IPizza } from '../../interfaces/pizza.interface';

@Pipe({
  name: 'isPizza',
  standalone: true
})
export class IsPizzaPipe implements PipeTransform {
  transform(product: any): product is IPizza {
    return product.type === 'pizza';
  }
}
