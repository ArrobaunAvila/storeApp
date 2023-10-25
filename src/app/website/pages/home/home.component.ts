import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service'
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product.models';

@Component({
  selector: 'app-home',
  template: `<app-products [productId]="productId" [products]="products" (loadMoreOutput)="loadMoreData()"></app-products>`,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private limit = 10;
  private offset = 0;

  public  products:Product[] = [];
  public productId: string | null = null;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.productService.getProductsByPage(this.limit , this.offset)
    .subscribe( ( data => {
      this.products =  this.products.concat(data);
       this.offset += this.limit;
     }))
         //Asi obtenemos datos de tipo query params de la url
     this.route.queryParamMap.subscribe( params=>{
           this.productId =  params.get('product');

     })
  }


  loadMoreData(){
   this.productService.getProductsByPage(this.limit , this.offset)
   .subscribe( ( data => {
     this.products =  this.products.concat(data);
     this.offset += this.limit;
    }))

  }



}
