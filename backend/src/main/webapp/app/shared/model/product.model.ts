import { IShop } from 'app/shared/model/shop.model';
import { IProductCategory } from 'app/shared/model/product-category.model';
import { IProductAttribute } from 'app/shared/model/product-attribute.model';

export interface IProduct {
  id?: number;
  name?: string;
  description?: string | null;
  price?: number;
  productImageContentType?: string | null;
  productImage?: string | null;
  active?: boolean;
  featured?: boolean | null;
  shop?: IShop;
  productCategory?: IProductCategory;
  productAttribute?: IProductAttribute;
}

export const defaultValue: Readonly<IProduct> = {
  active: false,
  featured: false,
};
