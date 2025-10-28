import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom'
import { Context } from './Providers';
import Shop from '../pages/Shop';
import { authRoutes, publicRoutes } from '../routes';


const AppRouter = observer(() => {
	const { user } = useContext(Context)!

	return (
		<Routes>
			{user.isAuth && authRoutes.map(({ path, element }) =>
				<Route key={path} path={path} element={element} />
			)}
			{publicRoutes.map(({ path, element }) =>
				<Route key={path} path={path} element={element} />
			)}
			<Route path='*' element={<Shop />} />
		</Routes>
	);
});

export default AppRouter;