import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { addToBasket, fetchOneDevice } from "../http/deviceAPI";
import type { Device } from '../entities/device/types';

const DevicePage = () => {
	const [device, setDevice] = useState<Device | null>(null)
	const { id } = useParams<'id'>()
	useEffect(() => {
		if(!id) return
		fetchOneDevice(Number(id)).then(data => setDevice(data))
	}, [])
	// ------- Создаём функцию для записи ------- //
	const add = () => {
		const formData = new FormData()
		formData.append('deviceId', String(id))
		addToBasket(formData).then(() => alert(`Товар ` + device?.name + ` был добавлен в вашу корзину!`))
	}

	return (
		<Container className="mt-3">
			<Row>
				<Col md={4}>
					<Card
						className="d-flex flex-column align-items-center justify-content-around"
						style={{ width: 300, height: 300, fontSize: 32, border: 'white' }}
					>
						<h1>{device?.name}</h1>

					</Card>
				</Col>
				<Col md={4}>
					<Image style={{objectFit: 'cover'}} width={300} height={300} src={device?.img}  />
				</Col>
				<Col md={4}>
					<Card
						className="d-flex flex-column align-items-center justify-content-around"
						style={{ width: 300, height: 300, fontSize: 32, border: '5px solid lightgray' }}
					>
						<h3>Стоимость</h3>
						<h3>{device?.price} ₽</h3>

						{/* Запускаем функцию */}
						<Button variant={"outline-dark button-admin"} onClick={add} >Добавить в корзину</Button>

					</Card>
				</Col>
			</Row><br />
			<Row className="d-flex flex-column m-3">
				<h2>Характеристики</h2>
				{device?.info.map((info, index) =>
					<Row key={info.id} style={{ border: '2px solid lightgray', background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10, borderRadius: '5px' }}>
						{info.title}: {info.description}
					</Row>
				)}
			</Row>
		</Container>
	);
};
export default DevicePage;