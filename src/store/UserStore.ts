import { makeAutoObservable } from 'mobx'
import type { User } from '../entities/user/types'

export default class UserStore {
  private _isAuth: boolean = false
  private _user: User | null = null
  constructor() {
    makeAutoObservable(this)
  }

  setIsAuth(bool: boolean) {
    this._isAuth = bool
  }

  setUser(u: User) {
    this._user = u
  }

  get isAuth() {
    return this._isAuth
  }

  get user() {
    return this._user
  }
}
