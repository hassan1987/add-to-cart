import { HttpClient } from "@angular/common/http";
import { Injectable, inject, signal } from "@angular/core";
import { BehaviorSubject, Observable, catchError, map } from "rxjs";
import { environment } from "../../app.config.js";
import { Product } from "../model/product/product.js";
import { CartState } from "../model/cart/cart-state.js";
import { CartStore } from "./cart-store.service.js";

@Injectable({ providedIn: "root" })
export class ProductService {
  // Declare httpclient for call api
  private readonly http = inject(HttpClient);
  private readonly cartService = inject(CartStore);
  // Route for all products
  HTTP_PRDUCTS: string = "/products";

  private productsSubject = new BehaviorSubject<Product[]>([]);
  public products = this.productsSubject.asObservable();
  public search = new BehaviorSubject<string>("");

  public selectedProduct = signal({});

  // Call api f retrieve all products
  public getAllProducts() {
    this.http.get<Product[]>(environment.host + this.HTTP_PRDUCTS)
      .pipe(
        catchError(() => {
          this.productsSubject.error('An error occurred');
          return [];
        }),
        map((products) => {
          // processing data before updating the current state
          return products;
        })
      )
      .subscribe(products => {
        this.cartService.state.cartItems.forEach(itemCart => {
          products.map(itemProduct => {
            if (itemProduct.id === itemCart.productId) {
              itemProduct.isInCart = itemCart.isInCart;
            }
          });
        });
        this.productsSubject.next(products);
      });
  }

}
