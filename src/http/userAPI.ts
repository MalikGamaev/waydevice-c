import { $authHost, $host } from ".";
import {jwtDecode} from 'jwt-decode';



export const registration = async (email, password) => {
	const { data } = await $host.post('api/user/registration', { email, password, role: 'ADMIN' })
	localStorage.setItem('token', data.token)
	return jwtDecode(data.token)
}

export const login = async (email, password) => {
	const { data } = await $host.post('api/user/login', { email, password })
	localStorage.setItem('token', data.token)
	return jwtDecode(data.token)
}

export const check = async () => {
	const token = localStorage.getItem('token');
	if (token) {
		const { data } = await $authHost.get('api/user/auth');
		localStorage.setItem('token', data.token);
		return jwtDecode(data.token);
	} else {
		throw Error('не авторизован');
	}
};