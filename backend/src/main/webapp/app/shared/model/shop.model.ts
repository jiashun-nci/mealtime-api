import { IUser } from 'app/shared/model/user.model';

export interface IShop {
  id?: number;
  name?: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string | null;
  city?: string;
  country?: string;
  shopImageContentType?: string | null;
  shopImage?: string | null;
  deliveryFee?: number | null;
  user?: IUser;
}

export const defaultValue: Readonly<IShop> = {};
