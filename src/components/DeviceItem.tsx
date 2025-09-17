import React from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import star from '../assets/star.png'
import { DEVICE_ROUTE } from '../utils/consts';

const DeviceItem = ({ device }) => {
	const navigate = useNavigate()
	console.log(device.brand)
	return (
		<Col md={3} className={'mt-3'} >
			<Card
				style={{ width: 150, cursor: 'pointer', }}
				border={'light'}
				onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}
			>
				<Image width={150} height={150} src={process.env.REACT_APP_API_URL + device.img} />
				<div className='text-black-50 mt-1 d-flex justify-content-between align-items-center'>
					<div>{device.brand}</div>
					<div className=' d-flex align-items-center'>
						<div>{device.rating}</div>
						<Image width={15} height={15} src={star} />
					</div>
					<div>{device.name}</div>
				</div>

			</Card>
		</Col>
	);
};

export default DeviceItem;