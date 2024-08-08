import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalItems',
  standalone: true
})
export class TotalItemsPipe implements PipeTransform {
  transform(length: number): string {
    if (length === 1) return `${length} товар`;
    else if (length > 1 && length < 5) return `${length} товара`;
    else return `${length} товаров`;
  }
}
