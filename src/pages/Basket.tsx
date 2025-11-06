import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Context } from '../components/Providers';
import { Card, Col, Container, Row } from 'react-bootstrap'
import { observer } from 'mobx-react-lite';
import { deleteOneDeviceToBasket, getBasket } from '../http/deviceAPI';
import { FaTrash } from 'react-icons/fa'
import '../style/style.css'

//import close from '../assets/close.svg'

const Basket = observer(() => {
	const { device } = useContext(Context)!
	const [totalAmount, setTotalAmount] = useState(0)

	useEffect(() => {
		getBasket().then(data => device.setBaskets(data))
	}, [])

	const deleteOrder = (id: number) => {
		const removedItem = device.basket.find(el => el.id === id)
		deleteOneDeviceToBasket(id).then(() => {
			device.setBaskets(device.basket.filter(el => el.id !== id)) 
			alert(`Товар ` + removedItem?.device.name + ` был удален из вашей корзины!`)}
		)
	}

	const targetSum = device.basket.reduce((sum, item) => sum + Number(item.device.price), 0);

	
	useEffect(() => {
    let start = totalAmount;
    const diff = targetSum - start;
    if (diff === 0) return; // если сумма не поменялась, ничего не делаем
    const duration = 500; // миллисекунд
    const increment = diff / (duration / 20); // обновляем каждые 20ms
    const timer = setInterval(() => {
      start += increment;
      if ((increment > 0 && start >= targetSum) || (increment < 0 && start <= targetSum)) {
        setTotalAmount(targetSum);
        clearInterval(timer);
      } else {
        setTotalAmount(Math.round(start));
      }
    }, 20);

    return () => clearInterval(timer);
  }, [targetSum]);
	return (
		<Container
			className="d-flex  flex-column justify-content-center align-items-center mt-3"
		>
			<h1 className="play-bold pb-2">Корзина</h1>

			{/* ------- Считаем общую сумму ------- */}

			<Card className="d-flex flex-row  p-2 justify-content-between align-items-center mb-2">
				<h1 className="play-bold pr-2">Итого: </h1>
				<h2 className="play-bold mb-0">{totalAmount}<span style={{color: 'green'}} className="font-weight-light pl-2">₽</span></h2>
			</Card>
			{device.basket.map(product =>
				<Card className="d-flex w-100 p-2 justify-content-center mb-2" key={product.id}>
					<Row className="d-flex w-100">
						<Col>
							<div className="d-flex flex-row align-items-center">
								<img src={product.device.img} width={120} />
								<h1 className="pl-3">{product.device.name}</h1>
							</div>
						</Col>
						<Col>
							<div className="d-flex h-100 flex-row justify-content-end align-items-center">
								<h2 className="font-weight-light">{product.device.price} <span style={{color: 'green'}}>₽</span></h2>
								<div className='deleteOrder'>
									<FaTrash onClick={() => deleteOrder(product.id!)} />
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