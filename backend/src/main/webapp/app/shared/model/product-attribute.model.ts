import { IProduct } from 'app/shared/model/product.model';

export interface IProductAttribute {
  id?: number;
  name?: string;
  value?: string | null;
  priceExtra?: number;
  products?: IProduct[] | null;
}

export const defaultValue: Readonly<IProductAttribute> = {};
