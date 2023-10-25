import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product.models';
import {  Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  productId: string | null = null;
  product: Product | null =  null;

  constructor(
    private route: ActivatedRoute,
    private service: ProductsService,
    private location: Location
    ) { }

  ngOnInit(): void {
    //Ejemplo para obtener datos de tipo parametro en la url
   this.route.paramMap
   .pipe(
      switchMap((params) => {

         this.productId =  params.get('id');
         console.log(`${this.productId}`);
         if(this.productId){
              return this.service.getProduct(this.productId);
         }
         return [null];
      })
   ).subscribe(data => {
      this.product = data;
   })

  }

  backPage(){
    this.location.back();
  }



}
