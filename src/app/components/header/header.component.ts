import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartState } from '../../core/model/cart/cart-state';
import { CartStore } from '../../core/service/cart-store.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  router = inject(Router);
  cartService = inject(CartStore);
  cartItem$: Observable<CartState> = this.cartService.state$;
  public rediectToCart() {
    this.router.navigate(['/cart']);
  }
}
