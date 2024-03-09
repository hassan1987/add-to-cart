import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../core/model/product/product';
import { CartStore } from '../../core/service/cart-store.service';
import { ProductService } from '../../core/service/product.service';
import { initialState } from '../../core/model/cart/cart-state';
import { CartItem } from '../../core/model/cart/cart-item';
import { Router } from '@angular/router';
import { FilterPipe } from '../../shared/pipe/filter.pipe';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FilterPipe],
  providers: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  //injetion services
  productService = inject(ProductService);
  cartService = inject(CartStore);
  router = inject(Router);

  product$: Observable<Product[]> = this.productService.products;
  searchKey: string = "";

  public ngOnInit(): void {
    this.productService.getAllProducts();
    this.productService.search.subscribe(value => {
      this.searchKey = value;
    });
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

  public detailProduct(product: Product) {
    this.productService.selectedProduct.set(product);
    this.router.navigate(["details/product", product.id]);
  }
}
