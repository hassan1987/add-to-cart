import { Component, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CartState } from '../../core/model/cart/cart-state';
import { CartStore } from '../../core/service/cart-store.service';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../core/model/cart/cart-item';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartService = inject(CartStore);
  cartItem$: Observable<CartState> = this.cartService.state$;

  public removeCartItem(cartItemToRemove: CartItem) {
    this.cartService.removeCartItem(cartItemToRemove);
  }

  // get Total Cart
  public getTotalPrice() {
    let grandTotal = 0;
    this.cartItem$.pipe(
      map((cartState) => cartState.cartItems.map(cartItem => grandTotal += cartItem.itemTotal))
    );
  }
}
