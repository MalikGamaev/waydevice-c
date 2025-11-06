import type { Brand } from "../entities/brand/types";
import type { Type } from "../entities/type/types";
import { $authHost, $host } from "./index";


export const createType = async (type: Type) => {
	const { data } = await $authHost.post('api/type', type)
	return data
}

export const fetchTypes = async () => {
	const { data } = await $host.get('api/type')
	return data
}

export const createBrand = async (brand: Brand) => {
	const { data } = await $authHost.post('api/brand', brand)
	return data
}

export const fetchBrands = async () => {
	const { data } = await $host.get('api/brand',)
	return data
}

export const createDeviceForm = async (deviceData: FormData) => {
	
	try {
		const { data } = await $authHost.post('api/device', deviceData);
  		return data;
	} catch (error) {
		console.error(`Ошибка: ${error}`)
	}
  
};

export const updateDeviceForm = async (deviceId: number | undefined , deviceData: FormData) => {
	try {
		const {data} = await $authHost.put('api/device/' + deviceId, deviceData)
		return data
	} catch (error) {
		console.error(`Ошибка: ${error}`)
	}
}

export const deleteDevice = async (deviceId: number) => {
	try {
		await $authHost.delete('api/device/' + deviceId)
		return
	} catch (error) {
		console.error(`Ошибка: ${error}`)
	}
}

export const fetchDevices = async (typeId: number | null, brandId: number | null, searchName: string | null, page: number, limit = 10) => {
	const { data } = await $host.get('api/device', {
		params: {
			typeId, brandId, searchName, page, limit
		}
	})
	return data
}

export const fetchOneDevice = async (id: number) => {
	const { data } = await $host.get('api/device/' + id)
	return data
}

export const addToBasket = async (formData: FormData) => {
	const response  = await $authHost.post('api/basket', formData)
	return response
}

export const deleteOneDeviceToBasket = async (id: number) => {
	const response = await $authHost.delete('api/basket/' + id)
	return response
}

export const getBasket = async () => {
	const { data } = await $authHost.get('api/basket')
	return data
}