export interface IUser {
  id: string;
  name: string;
  email: string | null;
  image: string | null;
  favoriteIds: string[];
}
