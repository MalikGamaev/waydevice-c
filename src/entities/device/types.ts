import type { Basket } from "../basket/types";
import type { Brand } from "../brand/types";
import type { Type } from "../type/types";

export interface Device {
	id?: number;
	name: string;
	price: number;
	img: string;
	brandId: number;
	typeId: number;
	rating?: number;
	info: DeviceInfo[]
}

export interface DeviceInfo {
	id?: number;
	title: string;
	description: string
}

export interface IDeviceStore {
	types: Type[];
  	brands: Brand[];
  	devices: Device[];
  	basket: Basket[];
  	selectedType: Type | null;
  	selectedBrand: Brand | null;
	searchName: string;
  	page: number;
   totalCount: number;
  	limit: number;
	setTypes(types: Type[]): void;
	setBrands(brands: Brand[]): void
	setDevices(devices: Device[]): void
	setBaskets(basket: Basket[]): void
	setSelectedType(type: Type): void
	setSelectedBrand(brand: Brand): void
	setSearchName(searchName: string): void
	setPage(page: number): void
	setTotalCount(count: number): void
	setLimit(limit: number): void
	clearSelectedBrand(): void
	clearSelectedType(): void
	clearSearchName(): void
}