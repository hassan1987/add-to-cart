import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartState } from '../../core/model/cart/cart-state';
import { CartStore } from '../../core/service/cart-store.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/service/product.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  router = inject(Router);
  cartService = inject(CartStore);
  productService = inject(ProductService);

  cartItem$: Observable<CartState> = this.cartService.state$;

  public searchTerm: string = '';


  public rediectToCart() {
    this.router.navigate(['/cart']);
  }

  search(event: any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.productService.search.next(this.searchTerm);
  }
}
