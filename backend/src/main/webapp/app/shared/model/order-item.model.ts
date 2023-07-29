import dayjs from 'dayjs';
import { IOrder } from 'app/shared/model/order.model';
import { IProduct } from 'app/shared/model/product.model';

export interface IOrderItem {
  id?: number;
  placedDate?: string;
  quantity?: number;
  price?: number;
  order?: IOrder;
  product?: IProduct;
}

export const defaultValue: Readonly<IOrderItem> = {};
