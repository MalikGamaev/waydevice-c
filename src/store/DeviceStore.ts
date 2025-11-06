import { makeAutoObservable } from 'mobx'
import type { Type } from '../entities/type/types';
import type { Brand } from '../entities/brand/types';
import type { Device } from '../entities/device/types';
import type { Basket } from '../entities/basket/types';

export default class DeviceStore {
	private _types: Type[] = [];
  	private _brands: Brand[] = [];
  	private _devices: Device[] = [];
  	private _baskets: Basket[] = [];
  
  	private _selectedType: Type | null | undefined = null;
  	private _selectedBrand: Brand | null | undefined = null;
	private _currentDevice: boolean = false;
	private _searchName: string = '';
  
  	private _page: number = 1;
   private _totalCount: number = 0;
  	private _limit: number = 10;
	constructor() {
		makeAutoObservable(this)
	}

	setTypes(types: Type[]) {
		this._types = types
	}

	setBrands(brands: Brand[]) {
		this._brands = brands
	}

	setDevices(devices: Device[]) {
		this._devices = devices
	}

	setSearchName(searchName: string) {
		this._searchName = searchName
	}

	setBaskets(basket: Basket[]) {
		this._baskets = basket
	}

	setSelectedType(type: Type | undefined) {
		this.setPage(1)
		this._selectedType = type
	}

	setSelectedBrand(brand: Brand | undefined) {
		this.setPage(1)
		this._selectedBrand = brand
	}

	setCurrentDevice(device: boolean) {
		this._currentDevice = device
	}

	setPage(page: number) {
		this._page = page
	}

	setTotalCount(count: number) {
		this._totalCount = count
	}

	setLimit(limit: number) {
		this._limit = limit;
	}

	clearSelectedBrand() {
		this.setPage(1);
		this._selectedBrand = null;
	}

	clearSearchName() {
		this.setPage(1)
		this._searchName = ''
	}

	clearSelectedType() {
		this.setPage(1);
		this._selectedType = null;
	}

	get types() {
		return this._types
	}

	get brands() {
		return this._brands
	}

	get devices() {
		return this._devices
	}

	get searchName() {
		return this._searchName
	}

	get basket() {
		return this._baskets
	}

	get selectedType() {
		return this._selectedType
	}

	get selectedBrand() {
		return this._selectedBrand
	}

	get currentDevice() {
		return this._currentDevice
	}

	get page() {
		return this._page
	}

	get totalCount() {
		return this._totalCount
	}

	get limit() {
		return this._limit
	}
}