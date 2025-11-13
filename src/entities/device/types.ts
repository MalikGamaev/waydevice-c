import type { Basket } from '../basket/types'
import type { Brand } from '../brand/types'
import type { Type } from '../type/types'

export interface Device {
  id?: number
  name: string
  price: number
  img: string
  brandId: number
  typeId: number
  rating?: number
  oldPrice?: number
  info: DeviceInfo[]
}

export interface DeviceInfo {
  id?: number
  title: string
  description: string
  number?: number
}

export interface IDeviceStore {
  types: Type[]
  brands: Brand[]
  devices: Device[]
  basket: Basket[]
  selectedType: Type | null | undefined
  selectedBrand: Brand | null | undefined
  currentDevice: boolean
  searchName: string
  page: number
  totalCount: number
  limit: number
  setTypes(types: Type[]): void
  setBrands(brands: Brand[]): void
  setDevices(devices: Device[]): void
  setBaskets(basket: Basket[]): void
  setSelectedType(type: Type | undefined | null): void
  setSelectedBrand(brand: Brand | undefined | null): void
  setSearchName(searchName: string): void
  setCurrentDevice(device: boolean): void
  setPage(page: number): void
  setTotalCount(count: number): void
  setLimit(limit: number): void
  clearSelectedBrand(): void
  clearSelectedType(): void
  clearSearchName(): void
}
