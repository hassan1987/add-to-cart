import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../core/model/product/product';
import { CartStore } from '../../core/service/cart-store.service';
import { ProductService } from '../../core/service/product.service';
import { initialState } from '../../core/model/cart/cart-state';
import { CartItem } from '../../core/model/cart/cart-item';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  providers: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  //injetion services
  productService = inject(ProductService);
  cartService = inject(CartStore);

  product$: Observable<Product[]> = this.productService.products;

  public ngOnInit(): void {
    this.productService.getAllProducts();
  }

  public addToCart(productToAdd: Product) {
    const currentState = initialState;
    console.log("taille state addToCarte >>", currentState.cartItems.length);
    const cartItem: CartItem = {
      productId: productToAdd.id,
      image: productToAdd.image,
      price:productToAdd.price,
      title: productToAdd.title,
      description: productToAdd.description,
      quantity: 1,
      itemTotal: productToAdd.price
    };
    this.cartService.addCartItem(cartItem);
    console.log("taille state addToCarte >>", currentState.cartItems.length);
  }
}
