import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../model/product.model";
import { environment } from "../../../environments/environment";

@Injectable({providedIn: "root"})
export class ProductService {
    // Declare httpclient for call api
    private readonly http = inject(HttpClient);
    // Route for all products
    HTTP_PRDUCTS: string = "/products";

    
    // Call api f retrieve all products
    public getAllProducts(): Observable<Product[]>{
        return this.http.get<Product[]>(environment.host+this.HTTP_PRDUCTS);
    }
}
