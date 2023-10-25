import { Injectable, OnInit } from '@angular/core';
import { Product } from '../models/Product.models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService implements OnInit {

 private myShoppingCart : Product[] = [];
 private myCart = new BehaviorSubject<Product[]>([]);

 myCart$ = this.myCart.asObservable();

  constructor() { }


  ngOnInit(): void {

  }

  addProduct(product: Product) {
    this.myShoppingCart.push(product);
    this.myCart.next(this.myShoppingCart);
  }

  getTotal(){
   return this.myShoppingCart.reduce((sum , item) => sum + item.price, 0);
  }

 getShoopingCart (){
  return this.myShoppingCart;
 }

}
