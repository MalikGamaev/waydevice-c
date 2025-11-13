export interface User {
  id?: number
  email: string
  password: string
  role: 'ADMIN' | 'USER'
}

export interface IUserStore {
  isAuth: boolean
  user: User | null
  setIsAuth(bool: boolean): void
  setUser(u: User | null): void
}
