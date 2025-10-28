import { createContext, type FC } from 'react';
import UserStore from '../store/UserStore';
import DeviceStore from '../store/DeviceStore';
import type { IUserStore } from '../entities/user/types';
import type { IDeviceStore } from '../entities/device/types';

interface ContextType {
	user: IUserStore;
	device: IDeviceStore
}

// eslint-disable-next-line react-refresh/only-export-components
export const Context = createContext<ContextType | null>(null);

const Providers: FC<{children: React.ReactNode}> = ({children}) => {
	return (
		<Context.Provider
			value={{ user: new UserStore(), device: new DeviceStore() }}
		>
			{children}
		</Context.Provider>
	);
};
export default Providers;