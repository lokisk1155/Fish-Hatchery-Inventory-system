export enum Role {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
}

export interface SessionUser {
  email: string
  image: string
  name: string
  role: Role
}
