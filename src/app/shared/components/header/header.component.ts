import { Component, HostListener, inject } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { CartService } from '../../services/cart/cart.service';
import { PizzaService } from '../../services/pizza/pizza.service';

@Component({
  standalone: true,
  imports: [ButtonComponent],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  cartService = inject(CartService);
  pizzaService = inject(PizzaService);

  scrolled: boolean = false;

  links = [
    {
      name: 'Пиццы',
      href: '#pizzas'
    },
    {
      name: 'Завтрак',
      href: '#breakfast'
    },
    {
      name: 'Закуски',
      href: '#snacks'
    },
    {
      name: 'Коктейли',
      href: '#cocktails'
    }
  ];

  activeLink: string;

  constructor() {}

  @HostListener('window:scroll', [])
  change(){
    this.toggleHeader();
    this.toggleActiveLink();
  }

  toggleHeader(){
    if (window.scrollY > 50) this.scrolled = true;
    else this.scrolled = false;
  }

  toggleActiveLink(){
    const firstContainer: HTMLElement = document.querySelector(this.links[0].href)!;

    this.links.forEach(l => {
      const container: HTMLElement = document.querySelector(l.href)!;

      if (window.scrollY < (firstContainer.offsetTop - 200)) this.activeLink = '';
      if (window.scrollY > (container.offsetTop - 200)) this.activeLink = l.href;
    })
  }
}
