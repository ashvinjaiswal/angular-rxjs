import { Component, OnInit, OnDestroy } from '@angular/core';

import { catchError, EMPTY, Observable, Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list-alt.component.html'
})
export class ProductListAltComponent implements OnInit{
  pageTitle = 'Products';
  errorMessage = '';
  selectedProductId = 0;

  products$ : Observable<Product[]> | undefined;
  sub!: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.products$ = this.productService.getProducts().pipe(
      catchError(err => {
        this.errorMessage =err;
        return EMPTY;
      })
    );
  }

  onSelected(productId: number): void {
    console.log('Not yet implemented');
  }
}
