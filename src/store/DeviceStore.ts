import { makeAutoObservable } from 'mobx'

export default class DeviceStore {
	constructor() {
		this._types = []
		this._brands = []
		this._devices = []
		this._baskets = []

		this._selectedType = {}
		this._selectedBrand = {}
		this._page = 1
		this._totalCount = 0
		this._limit = 3
		makeAutoObservable(this)
	}

	setTypes(types) {
		this._types = types
	}

	setBrands(brands) {
		this._brands = brands
	}

	setDevices(devices) {
		this._devices = devices
	}

	setBaskets(basket) {
		this._baskets = basket
	}

	setSelectedType(type) {
		this.setPage(1)
		this._selectedType = type
	}

	setSelectedBrand(brand) {
		this.setPage(1)
		this._selectedBrand = brand
	}

	setPage(page) {
		this._page = page
	}

	setTotalCount(count) {
		this._totalCount = count
	}

	setLimit(limit) {
		this._limit = limit;
	}

	clearSelectedBrand() {
		this.setPage(1);
		this._selectedBrand = {};
	}

	clearSelectedType() {
		this.setPage(1);
		this._selectedType = {};
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

	get basket() {
		return this._baskets
	}

	get selectedType() {
		return this._selectedType
	}

	get selectedBrand() {
		return this._selectedBrand
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