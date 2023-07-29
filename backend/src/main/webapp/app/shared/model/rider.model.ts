export interface IRider {
  id?: number;
  name?: string;
  phone?: string;
  avatarContentType?: string | null;
  avatar?: string | null;
}

export const defaultValue: Readonly<IRider> = {};
