import { Product } from "./Product.models";

export interface CreateProductDTO extends Omit<Product, 'id' | 'category'> {
 categoryId: number
}
