import { $authHost, $host } from ".";
import {jwtDecode} from 'jwt-decode';
import type { User } from "../entities/user/types";



export const registration = async (email: string, password: string) => {
	const { data } = await $host.post('api/user/registration', { email, password })
	localStorage.setItem('token', data.token)
	return jwtDecode<User>(data.token)
}

export const login = async (email: string, password: string) => {
	const { data } = await $host.post('api/user/login', { email, password })

	localStorage.setItem('token', data.token)
	return jwtDecode<User>(data.token)
}

export const check = async (): Promise<User> => {
	const token = localStorage.getItem('token');
	if (token && token !== 'undefined') {
		const { data } = await $authHost.get('api/user/auth');
		localStorage.setItem('token', data.token);
		return jwtDecode<User>(data.token);
	} else {
		throw Error('не авторизован');
	}
};