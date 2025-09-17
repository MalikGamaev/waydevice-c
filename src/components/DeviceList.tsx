import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Context } from './Providers';
import DeviceItem from './DeviceItem';

const DeviceList = observer(() => {
	const { device } = useContext(Context)
	return (
		<Row className='d-flex'>

			{device.devices.map(d =>
				<DeviceItem key={d.id} device={d} />
			)}

		</Row>
	);
});

export default DeviceList;