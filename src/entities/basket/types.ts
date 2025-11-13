import type { Device } from '../device/types'

export interface Basket {
  id?: number
  basketId?: number
  deviceId?: number
  device: Device
}

export interface BasketDevice {
  id?: number
}
