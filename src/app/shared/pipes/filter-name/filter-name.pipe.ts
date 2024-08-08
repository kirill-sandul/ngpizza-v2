import { Pipe, PipeTransform } from '@angular/core';
import { IFilter } from '../../interfaces/filter.interface';

@Pipe({
  name: 'filterName',
  standalone: true
})
export class FilterNamePipe implements PipeTransform {
  transform(value: IFilter): string {
    if (value === 'price') return 'цене';
    else if (value === 'rating') return 'популярности';
    else if (value === 'alphabet') return 'алфавиту';

    return '';
  }
}
