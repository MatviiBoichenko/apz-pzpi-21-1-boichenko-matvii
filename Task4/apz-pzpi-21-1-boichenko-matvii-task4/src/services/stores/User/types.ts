export enum UserRole {
  Customer = 1,
  Deliverer = 2,
  Admin = 3
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  birthdate: string | null;
  role: UserRole;
}