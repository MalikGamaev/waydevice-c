import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Card, Col, Form, Row, } from 'react-bootstrap';
import { Context } from './Providers';

const BrandBar = observer(() => {
	const { device } = useContext(Context)
	return (
		<Row>
			<Col className='d-flex flex-wrap'>
				{device.brands.map(brand =>
					<Card
						style={{ cursor: 'pointer' }}
						className='p-3'
						key={brand.id}
						onClick={() => device.setSelectedBrand(brand)}
						border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
					>
						{brand.name}
					</Card>
				)}
			</Col>

		</Row>
	);
});

export default BrandBar;