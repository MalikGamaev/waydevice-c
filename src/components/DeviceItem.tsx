import { Card, Col, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import star from '../assets/star.png'
import { DEVICE_ROUTE } from '../utils/consts';
import type { FC } from 'react';
import type { Device } from '../entities/device/types';

const DeviceItem: FC<{device: Device}> = ({ device }) => {
	const navigate = useNavigate()
	return (
		<Col md={3} className='mt-3' >
			<Card
				style={{ cursor: 'pointer', maxWidth: 183, border: '3px solid purple'}}
				onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}
				className='p-3'
			>
				<Image style={{ objectFit: 'cover', width: '145px', height: '145px' }} src={device.img} />
				<div className='text-black-50 mt-1 d-flex justify-content-between align-items-center'>
					
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