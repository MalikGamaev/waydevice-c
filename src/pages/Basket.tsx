import React, { useEffect } from 'react';
import { useContext } from 'react';
import { Context } from '../components/Providers';
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { observer } from 'mobx-react-lite';
import { deleteOneDeviceToBasket, getBasket } from '../http/deviceAPI';
import { FaTrash } from 'react-icons/fa'
import '../style/style.css'

//import close from '../assets/close.svg'

const Basket = observer(() => {
	const { device } = useContext(Context)

	useEffect(() => {
		getBasket().then(data => device.setBaskets(data))
	}, [])

	const deleteOrder = (id) => {
		device.basket.filter(el => el.id !== id)
		const formData = new FormData()
		formData.append('deviceId', id)
		deleteOneDeviceToBasket(formData).then(response => alert(`Товар ` + device.basket.device.name + ` был удален из вашей корзины!`))
	}

	let prices = 0;
	{
		device.basket.map(price =>
			prices += Number(price.device.price)
		)
	}
	return (
		<Container
			className="d-flex flex-sm-column justify-content-center align-items-center mt-3"
		>
			<h1 className="pb-2">Корзина</h1>

			{/* ------- Считаем общую сумму ------- */}

			<Card className="d-flex flex-row  p-2 justify-content-between align-items-center mb-2">
				<h1 className="pr-2">Итого:</h1>
				<h2 className="pl-2">{prices}<span className="font-weight-light pl-2">₽</span></h2>
			</Card>
			{device.basket.map(product =>
				<Card className="d-flex w-100 p-2 justify-content-center mb-2" key={product.id}>
					<Row className="d-flex w-100">
						<Col>
							<div className="d-flex flex-row align-items-center">
								<img src={process.env.REACT_APP_API_URL + product.device.img} width={120} />
								<h1 className="pl-3">{product.device.name}</h1>
							</div>
						</Col>
						<Col>
							<div className="d-flex h-100 flex-row justify-content-end align-items-center">
								<h2 className="font-weight-light">{product.device.price} ₽</h2>
								<div className='deleteOrder'>
									<FaTrash onClick={() => deleteOrder(product.id)} />
								</div>
							</div>
						</Col>
					</Row>
				</Card>
			)}
		</Container>
	);
});

export default Basket;