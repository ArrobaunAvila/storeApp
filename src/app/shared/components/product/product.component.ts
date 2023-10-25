import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/Product.models';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor() { }



  @Input() product: Product = {
   id: '',
   title: '',
   price: 0,
   images: [],
   description: '',
   category: {
    id: 0,
    name: '',
    typeimage: ''
   }
  }

 url_img : string = 'https://source.unsplash.com/random/?product';
 @Output() addedProduct = new EventEmitter <Product>();
 @Output() showProduct = new EventEmitter<string>();

  ngOnInit(): void {
  }


 addToCart(){
   this.addedProduct.emit(this.product);
 }

 onShowDetail(){
   this.showProduct.emit(this.product.id);
 }


}
