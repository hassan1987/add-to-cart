import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { catchError, map } from "rxjs";
import { environment } from "../../app.config.js";
import { ProductState, initialState } from "../model/product/product-state.js";
import { Product } from "../model/product/product.js";
import { Store } from "../store.js";

@Injectable({providedIn: "root"})
export class ProductService extends Store<ProductState>{
    // Declare httpclient for call api
    private readonly http = inject(HttpClient);
    // Route for all products
    HTTP_PRDUCTS: string = "/products";

    constructor() {
        super(initialState);
    }

    // Call api f retrieve all products
    public getAllProducts(){
        this.http.get<Product[]>(environment.host+this.HTTP_PRDUCTS)
      .pipe(
        catchError(() => {
          return [];
        }),
        map((products) => {
          // processing data before updating the current state
          return products;
        })
      )
      .subscribe((products) => {
        const newState: ProductState = {
            ...this.state,
            productItems: products
        };
        this.setState(newState);
      });
    }
    
}
