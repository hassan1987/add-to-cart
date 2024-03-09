import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { CartItem } from '../../core/model/cart/cart-item';
import { CartState } from '../../core/model/cart/cart-state';
import { CartStore } from '../../core/service/cart-store.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cartService = inject(CartStore);
  router = inject(Router);

  cartItem$: Observable<CartState> = this.cartService.state$;

  // remove item from cart
  public removeCartItem(cartItemToRemove: CartItem) {
    this.cartService.removeCartItem(cartItemToRemove);
  }

  // get Total Cart
  public getTotalPrice(): number{
    return this.cartService.grandTotal();
  }

  //clear cart
  public removeAllCart() {
    this.cartService.clearCart();
  }

  public updateQuantity(cartItemToUpdate: CartItem) {
    this.cartService.updateCartItem(cartItemToUpdate);
  }

  public redirectToPoductsList() {
    this.router.navigate(['/products']);
  }
}
