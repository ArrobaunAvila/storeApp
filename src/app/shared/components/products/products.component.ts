import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/Product.models';
import { CreateProductDTO } from 'src/app/models/CreateProductDTO';
import { StoreService } from '../../../services/store.service';
import { ProductsService } from '../../../services/products.service';
import { UpdateProductDTO } from 'src/app/models/UpdateProductDTO';

import { zip } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  public myShoppingCart : Product[] = [];

  total: number = 0;
  productChosen: Product = {
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

  @Input() products: Product[] = [];
  @Output() loadMoreOutput = new EventEmitter();

  @Input()
  set productId(id: string | null){
    this.showProductDetail = false;
     if(id){
         this.showDetail(id);
     }
  }//Vigilamos el cambio de este imput

  public today = new Date();
  public date = new Date(2021,1,21);

  statusDetail : 'loading' | 'success' |  'error' | 'init' = 'init';
  limit = 20;
  offset = 0;

 showProductDetail: boolean = false;


  constructor(private storeService: StoreService, private productService: ProductsService) {
    this.myShoppingCart = this.storeService.getShoopingCart();
  }



  onAddToShoppingCart(product: Product){
   this.storeService.addProduct(product);
   this.total = this.storeService.getTotal();
  }

   toggleProductDetail() {
     this.showProductDetail = !this.showProductDetail;
   }

  showDetail(id: string){
    this.statusDetail = 'loading'
    this.productService.getProduct(id)
    .subscribe((data) => {
      this.toggleProductDetail();
      this.productChosen = data;
      this.statusDetail = 'success';
    }, error => {
      this.statusDetail = 'error';
      window.alert(error);
    })

  }

  readAndUpdate(id:string) {
    this.productService.getProduct(id)
      .pipe(

        switchMap( (product) => this.productService.update(product.id , {title: 'change'}))

      ).subscribe(data => {
        console.log(data);
      });

      this.productService.fetchReadAndUpdate(id, {title: 'nuevo'})
      .subscribe(response => {
         const read = response[0];
         const update = response[1];
      })
  }



  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'Nuevo producto',
      description: 'bla bla bla',
      images: ['https://placeimg.com/640/480/any?r=0.44735952987972394'],
      categoryId: 3,
      price: 1000
    }
   this.productService.create(product)
   .subscribe( (data ) => {
    this.products.unshift(data);
   })
  }

  updateProduct() {
    const changes: UpdateProductDTO = {
     title: 'Logamina',

    }

    const id = this.productChosen.id;
    this.productService.update(id, changes)
    .subscribe( (data) => {
     const  productIndex = this.products.findIndex( item => item.id === this.productChosen.id);
     this.products[productIndex] = data;
     this.showProductDetail = false;
    })
  }

  deleteProduct() {
     this.productService.delete(this.productChosen.id)
     .subscribe( () => {
     const  productIndex = this.products.findIndex( item => item.id === this.productChosen.id);
     this.products.splice(productIndex,1);
     this.showProductDetail  = false;

     })
  }

  loadMoreData(){
    this.loadMoreOutput.emit();
  }

}
