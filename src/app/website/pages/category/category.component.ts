import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service'
import { Product } from 'src/app/models/Product.models';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-category',
  template:`<app-products [productId]="productId" [products]="product"></app-products>`,
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  public categoryId: string | null = null;
  public product: Product[] = [];
  public productId: string | null = null;
  limit = 10;
  offset = 0;

  constructor( private activeRoute: ActivatedRoute,
     private service: ProductsService) { }

  ngOnInit(): void {

    this.activeRoute.paramMap
    .pipe(
      switchMap( params => {
        this.categoryId = params.get('id');
        if(this.categoryId){
         return this.service.getProductByCategory(this.categoryId, this.limit, this.offset);
        }
        return [];

    })
    )
   .subscribe(data => {
    this.product = data;
   })

   this.activeRoute.queryParamMap.subscribe( params=>{
    this.productId =  params.get('product');
    })
  }



}
