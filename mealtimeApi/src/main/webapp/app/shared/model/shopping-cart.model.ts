import dayjs from 'dayjs';
import { IProduct } from 'app/shared/model/product.model';

export interface IShoppingCart {
  id?: number;
  placedDate?: string | null;
  quantity?: number | null;
  price?: number | null;
  product?: IProduct | null;
}

export const defaultValue: Readonly<IShoppingCart> = {};
