import dayjs from 'dayjs';
import { IProductOrder } from 'app/shared/model/product-order.model';
import { IProduct } from 'app/shared/model/product.model';

export interface IOrderItem {
  id?: number;
  placedDate?: string | null;
  quantity?: number | null;
  price?: number | null;
  productOrder?: IProductOrder | null;
  product?: IProduct | null;
}

export const defaultValue: Readonly<IOrderItem> = {};
