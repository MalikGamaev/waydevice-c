import React, { createContext } from 'react';
import UserStore from '../store/UserStore';
import DeviceStore from '../store/DeviceStore';
import App from '../App';

export const Context = createContext(null);

const Providers = ({ children }) => {
	return (
		<Context.Provider
			value={{ user: new UserStore(), device: new DeviceStore() }}
		>
			<App />
		</Context.Provider>
	);
};
export default Providers;