import { IShop } from 'app/shared/model/shop.model';
import { IProductCategory } from 'app/shared/model/product-category.model';

export interface IProduct {
  id?: number;
  name?: string;
  description?: string | null;
  price?: number;
  productImageContentType?: string | null;
  productImage?: string | null;
  featured?: boolean | null;
  shop?: IShop | null;
  productCategory?: IProductCategory | null;
}

export const defaultValue: Readonly<IProduct> = {
  featured: false,
};
