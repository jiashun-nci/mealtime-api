import dayjs from 'dayjs';
import { IRider } from 'app/shared/model/rider.model';
import { IUser } from 'app/shared/model/user.model';
import { OrderStatus } from 'app/shared/model/enumerations/order-status.model';
import { PaymentMethod } from 'app/shared/model/enumerations/payment-method.model';

export interface IProductOrder {
  id?: number;
  placedDate?: string | null;
  quantity?: number | null;
  totalPrice?: number | null;
  status?: OrderStatus | null;
  paymentMethod?: PaymentMethod | null;
  paymentReference?: string | null;
  rider?: IRider | null;
  user?: IUser | null;
}

export const defaultValue: Readonly<IProductOrder> = {};
