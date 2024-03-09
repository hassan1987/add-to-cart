import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { StarRatingModule } from 'angular-star-rating';
import { ProductService } from '../../core/service/product.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../core/model/product/product';
import { initialState } from '../../core/model/cart/cart-state';
import { CartItem } from '../../core/model/cart/cart-item';
import { CartStore } from '../../core/service/cart-store.service';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [StarRatingModule, CommonModule],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.css'
})
export class DetailProductComponent implements OnInit {

  router = inject(Router);
  productService = inject(ProductService);
  cartService = inject(CartStore);

  public selectedProduct: any;

  ngOnInit(): void {
    this.selectedProduct = this.productService.selectedProduct;
    if (this.selectedProduct().rating === undefined) {
      this.router.navigate(['/products']);
    }
  }

  rediectToProdctsList() {
    this.router.navigate(['/products']);
  }

  public addToCart(productToAdd: Product) {
    const currentState = initialState;
    productToAdd.isInCart = true;
    console.log("taille state addToCarte >>", currentState.cartItems.length);
    const cartItem: CartItem = {
      productId: productToAdd.id,
      image: productToAdd.image,
      price: productToAdd.price,
      title: productToAdd.title,
      description: productToAdd.description,
      quantity: 1,
      itemTotal: productToAdd.price,
      isInCart: true
    };
    this.cartService.addCartItem(cartItem);
    console.log("taille state addToCarte >>", currentState.cartItems.length);
  }
}
