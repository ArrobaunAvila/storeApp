import { Injectable } from '@angular/core';
import { HttpClient, HttpParams , HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { catchError, retry , map, tap} from 'rxjs/operators';
import { environment  } from '../../environments/environment';
import { Product } from '../models/Product.models';
import { CreateProductDTO } from '../models/CreateProductDTO';
import { UpdateProductDTO } from '../models/UpdateProductDTO';
import { checkTime } from '../interceptors/time.interceptor';
import { zip } from 'rxjs';
//Servicio para hacer request

//HttpClient libreria en angular para realizar peticiones
//rxjs - Programacion Reactiva en angular
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

 private apiUrl = `${environment.API_URL}/api`;

  constructor( private http: HttpClient) { }

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if(limit && offset){
      params = params.set('limit',limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(`${this.apiUrl}/products`, {params , context: checkTime()})
     .pipe(
       retry(3),
       map( products => products.map (item => {
          return {
            ...item,
            taxes: .19 * item.price
          }
       }))
     );
  }

  getProductByCategory(id: string, limit?: number , offset?: number){

    console.log(`method product.service --> getProductByCategory: ${id} - limit ${limit} - offset ${offset}`);
    let params = new HttpParams();
    if(limit && offset){
      params = params.set('limit',limit);
      params = params.set('offset', offset);
    }

    return this.http.get<Product[]>(`${this.apiUrl}/categories/${id}/products?limit=${limit}&offset=${offset}`);

  }


  getProduct(id: string){
    console.log(`method product.service --> getProduct: ${id}`);


    return this.http.get<Product>(`${this.apiUrl}/products/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {

         switch (error.status) {
          case 500:
             throw "Algo esta fallando en el server!";
            break;
          case 404:
               throw "El producto no existe";
            break;
          default:
              throw "Ups algo salio mal";
            break;
         }

      })
    )
  }

  getProductsByPage(limit: number, offset: number) {
    return this.http.get<Product[]>(`${this.apiUrl}/products`, {
      params: {limit, offset}
    }).pipe(
       map( products => products.map (item => {
          return {
            ...item,
            taxes: .19 * item.price
          }
       }))
    )
  }

  create(dto: CreateProductDTO){
    return this.http.post<Product>(`${this.apiUrl}/products`, dto);
  }

  update(id: string ,dto: UpdateProductDTO) {
   return this.http.put<Product>(`${this.apiUrl}/products/${id}`, dto);
  }

  delete(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/products/${id}`);
  }

  fetchReadAndUpdate(id: string,  dto: UpdateProductDTO){
    return zip(
         this.getProduct(id),
         this.update(id, {title: 'nuevo'})
    )
  }

}
