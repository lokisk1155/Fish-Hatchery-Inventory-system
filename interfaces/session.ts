export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

export interface SessionUser {
  email: string
  image: string
  name: string
  role: Role
}
