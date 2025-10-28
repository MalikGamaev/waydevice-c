import { useContext, useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import BrandBar from '../components/BrandBar';
import DeviceList from '../components/DeviceList';
import TypeBar from '../components/TypeBar';
import { observer } from 'mobx-react-lite';
import { Context } from '../components/Providers';
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceAPI';
import Pages from '../components/Pages';
import FilterDevices from '../components/FilterDevices';

const Shop = observer(() => {
	const { device } = useContext(Context)!
	useEffect(() => {
		fetchTypes().then(data => device.setTypes(data))
		fetchBrands().then(data => device.setBrands(data))
		fetchDevices(null, null, null, 1, 8).then(data => {
			device.setDevices(data.rows)
			device.setTotalCount(data.count)
		})
	}, [])

	useEffect(() => {
		fetchDevices( device.selectedType?.id ?? null, device.selectedBrand?.id ?? null, device.searchName || null, device.page, device.limit).then(data => {
			device.setDevices(data.rows)
			device.setTotalCount(data.count)
		})
	}, [device.page, device.selectedType, device.selectedBrand, device.searchName])

	const onClick = () => {
		device.clearSelectedType();
		device.clearSelectedBrand();
		device.clearSearchName();
	};

	return (
		<Container className='flex-grow-1'>
			<Row className='mt-2'>
				<Col md={3}>
					<FilterDevices/>
					<TypeBar />
					<Button className='mt-3' onClick={onClick}>Очистить фильтры</Button>
				</Col>
				<Col md={9}>
					<BrandBar />
					<DeviceList />
					<Pages />
				</Col>
			</Row>
		</Container>
	);
});

export default Shop;