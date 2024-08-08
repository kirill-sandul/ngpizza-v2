import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { HeaderComponent } from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);

  title = 'ng-pizza-v2';
    
  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects;
      const fragment = url.split('#')[1];
      
      if (fragment) this.scrollToFragment(fragment);
    });
  }

  private scrollToFragment(fragment: string): void {
    const element = document.getElementById(fragment);
    const headerHeight = document.querySelector('.header')?.clientHeight! + 40;
    
    window.scrollTo(0, element?.offsetTop! - headerHeight);
  }
}
