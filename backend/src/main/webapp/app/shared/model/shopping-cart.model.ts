import dayjs from 'dayjs';
import { IOrder } from 'app/shared/model/order.model';
import { ICustomerDetails } from 'app/shared/model/customer-details.model';

export interface IShoppingCart {
  id?: number;
  placedDate?: string;
  quantity?: number;
  price?: number;
  orders?: IOrder[] | null;
  customerDetails?: ICustomerDetails;
}

export const defaultValue: Readonly<IShoppingCart> = {};
