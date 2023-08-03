import { IUser } from 'app/shared/model/user.model';

export interface IRider {
  id?: number;
  name?: string;
  phone?: string;
  avatarContentType?: string | null;
  avatar?: string | null;
  user?: IUser;
}

export const defaultValue: Readonly<IRider> = {};
