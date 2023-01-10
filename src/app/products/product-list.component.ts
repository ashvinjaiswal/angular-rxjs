import { Component } from '@angular/core';

import {
  catchError,
  EMPTY,
  map,
  Observable,
  combineLatest,
  Subject,
  startWith,
} from 'rxjs';
import { ProductCategory } from '../product-categories/product-category';
import { ProductCategoryService } from '../product-categories/product-category.service';

import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  pageTitle = 'Product List';
  errorMessage = '';

  private categorySelectedSubject = new Subject<number>();
  selectedCategoryAction$ = this.categorySelectedSubject.asObservable();

  productsWithCategory$ = this.productService.productsWithCategory$;
  products$ = combineLatest([
    this.productService.productsWithCategory$,
    this.selectedCategoryAction$.pipe(startWith(0)),
  ]).pipe(
    map(([products, selctedCategoryId]) =>
      products.filter((product) =>
        selctedCategoryId ? product.categoryId == selctedCategoryId : true
      )
    ),
    catchError((err) => {
      console.log(err);
      this.errorMessage = err;
      return EMPTY;
    })
  );

  categories$: Observable<ProductCategory[]> =
    this.productCategoryService.productCategories$.pipe(
      catchError((err) => {
        this.errorMessage = err;
        //return of([]);
        return EMPTY;
      })
    );

  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService
  ) {}

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    // this.selectedCategoryId = 5;
    this.categorySelectedSubject.next(+categoryId);
  }
}
