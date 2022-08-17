import { Component } from '@angular/core';

import { catchError, EMPTY, map, Observable } from 'rxjs';
import { ProductCategory } from '../product-categories/product-category';
import { ProductCategoryService } from '../product-categories/product-category.service';

import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  pageTitle = 'Product List';
  errorMessage = '';
  selectedCategoryId = 1;

  products$ = this.productService.products$.pipe(
    catchError(err => {
      this.errorMessage = err;
      //return of([]);
      return EMPTY;
    }));

  productsWithCategory$ =  this.productService.productsWithCategory$;

  filterProducts$ = this.productsWithCategory$.pipe(
    map(products => products.filter(product => (this.selectedCategoryId ? product.categoryId === this.selectedCategoryId : true )))
  );

  categories$: Observable<ProductCategory[]> = this.productCategoryService.productCategories$.pipe(
    catchError(err => {
      this.errorMessage = err;
      //return of([]);
      return EMPTY;
    }));

  constructor(private productService: ProductService, private productCategoryService: ProductCategoryService) { }

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    this.selectedCategoryId = 5;
  }
}
