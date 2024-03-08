import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { BehaviorSubject, catchError, map } from "rxjs";
import { environment } from "../../app.config.js";
import { Product } from "../model/product/product.js";

@Injectable({ providedIn: "root" })
export class ProductService {
  // Declare httpclient for call api
  private readonly http = inject(HttpClient);
  // Route for all products
  HTTP_PRDUCTS: string = "/products";

  private productsSubject = new BehaviorSubject<Product[]>([]);
  public products = this.productsSubject.asObservable();

  constructor() {
  }

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
        this.productsSubject.next(products);
      });
  }

}
