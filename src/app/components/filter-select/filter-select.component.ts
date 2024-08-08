import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { PizzaService } from '../../shared/services/pizza/pizza.service';
import { IFilter } from './../../shared/interfaces/filter.interface';
import { FilterNamePipe } from '../../shared/pipes/filter-name/filter-name.pipe';

@Component({
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, FilterNamePipe],
  selector: 'app-filter-select',
  templateUrl: './filter-select.component.html',
  styleUrls: ['./filter-select.component.scss']
})
export class FilterSelectComponent {
  filters: IFilter[] = ['price', 'rating', 'alphabet'];

  pizzaService = inject(PizzaService);
}
