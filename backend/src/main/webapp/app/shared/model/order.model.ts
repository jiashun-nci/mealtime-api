import dayjs from 'dayjs';
import { IRider } from 'app/shared/model/rider.model';
import { IUser } from 'app/shared/model/user.model';
import { IShoppingCart } from 'app/shared/model/shopping-cart.model';
import { OrderStatus } from 'app/shared/model/enumerations/order-status.model';
import { PaymentMethod } from 'app/shared/model/enumerations/payment-method.model';

export interface IOrder {
  id?: number;
  placedDate?: string;
  quantity?: number;
  totalPrice?: number;
  status?: OrderStatus;
  paymentMethod?: PaymentMethod;
  paymentReference?: string | null;
  rider?: IRider;
  user?: IUser;
  cart?: IShoppingCart;
}

export const defaultValue: Readonly<IOrder> = {};
