export interface IUser {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  picture_url?: string;
  has_boarded: boolean;
}
