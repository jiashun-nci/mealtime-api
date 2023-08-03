import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';
import { Gender } from 'app/shared/model/enumerations/gender.model';

export interface ICustomerDetails {
  id?: number;
  name?: string;
  gender?: Gender | null;
  phone?: string | null;
  birthday?: string | null;
  addressLine1?: string | null;
  addressLine2?: string | null;
  city?: string | null;
  country?: string | null;
  avatarContentType?: string | null;
  avatar?: string | null;
  user?: IUser;
}

export const defaultValue: Readonly<ICustomerDetails> = {};
