import { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom';
import { addToBasket, deleteDevice, fetchOneDevice } from "../http/deviceAPI";
import type { Device } from '../entities/device/types';
import { Context } from '../components/Providers';
import DeviceModal from '../components/modals/DeviceModal';

const DevicePage = () => {
	const navigate = useNavigate()
	const {user, device} = useContext(Context)!
	const [deviceLocal, setDeviceLocal] = useState<Device | null>(null)
	const [deviceVisible, setDeviceVisible] = useState(false)
	const { id } = useParams<'id'>()
	useEffect(() => {
		if(!id) return
		fetchOneDevice(Number(id)).then(data => setDeviceLocal(data))
		device.setCurrentDevice(false)
	}, [device.currentDevice])

	// ------- Создаём функцию для записи ------- //
	const add = () => {
		if(!user.isAuth) alert('Нужно авторизоваться!')
		const formData = new FormData()
		formData.append('deviceId', String(id))
		addToBasket(formData).then(() => alert(`Товар ` + deviceLocal?.name + ` был добавлен в вашу корзину!`))
	}

	const deleteOneDevice = () => {
		deleteDevice(Number(id)).then(() => navigate('/'))
	}



	return (
		<Container className="mt-3">
			<Row>
    <Col xs={12} className="d-flex justify-content-center mb-3">
      <h1 className='d-page__name'>{deviceLocal?.name}</h1>
    </Col>
  </Row>
  <Row className="d-flex">
  <Col xs={12} sm={6} className="d-flex justify-content-center mb-3 mb-md-0">
    <Image
      style={{ objectFit: 'cover', maxWidth: '100%', height: 'auto' }}
      width={300}
      height={300}
      src={deviceLocal?.img}
      fluid
      alt={deviceLocal?.name}
    />
  </Col>

  <Col xs={12} sm={6} className='d-flex justify-content-center'>
    <Card
      className="d-page__card d-flex flex-column align-items-center justify-content-around px-3 py-3"
    >
      <h3>Стоимость</h3>
      <h3>{deviceLocal?.price} ₽</h3>
      {user.isAuth && user.user?.role === 'ADMIN' && (
        <>
          <Button variant="outline-dark button-admin mb-2" onClick={() => setDeviceVisible(true)}>Редактировать товар</Button>
          <Button variant="outline-dark button-admin mb-3" onClick={deleteOneDevice}>Удалить товар</Button>
        </>
      )}
      <Button variant="outline-dark button-admin" onClick={add}>Добавить в корзину</Button>
    </Card>
  </Col>
</Row>


  <Row className="d-flex flex-column m-3">
    <h2 className="text-center">Характеристики</h2>
    {deviceLocal?.info.map((info, index) => (
      <Row
        key={info.id}
        style={{
          border: '2px solid lightgray',
          background: index % 2 === 0 ? 'lightgray' : 'transparent',
          padding: 10,
        }}
        className="mx-0"
      >
        {info.title}: {info.description}
      </Row>
    ))}
  </Row>

  <DeviceModal show={deviceVisible} onHide={() => setDeviceVisible(false)} titleModal="Редактировать" currentDevice={deviceLocal} />
</Container>
	);
};
export default DevicePage;