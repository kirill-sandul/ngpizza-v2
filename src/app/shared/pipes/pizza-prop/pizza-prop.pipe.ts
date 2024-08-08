import { Pipe, PipeTransform } from '@angular/core';

type PizzaProps = { [key: number]: string };

@Pipe({
  name: 'pizzaProp',
  standalone: true
})
export class PizzaPropPipe implements PipeTransform {
  pizza_types: PizzaProps = {
    0: 'Традиционное',
    1: 'Тонкое'
  }

  pizza_sizes: PizzaProps = {
    25: 'Маленькая',
    30: 'Средняя',
    35: 'Большая'
  }
  
  transform(value: number, prop: string): string {
    if(prop === 'type') return this.pizza_types[value];
    if(prop === 'size') return this.pizza_sizes[value];

    return '';
  }
}
