import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../core/model/product/product';
import { ProductService } from '../../core/service/product.service';
import { ProductState } from '../../core/model/product/product-state';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  providers: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  
  // public productList : Product[] | undefined;
  productService = inject(ProductService);
  product$: Observable<ProductState> = this.productService.state$;

  public ngOnInit(): void {
    // this.api.getAllProducts().subscribe(products=>{
    //   this.productList = products;
    // })
    this.productService.getAllProducts();
  }

}
