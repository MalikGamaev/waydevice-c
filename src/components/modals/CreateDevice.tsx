import { useContext, useEffect, useState, type ChangeEvent, type FC } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown, Form, Row, Col } from "react-bootstrap";
import { Context } from '../Providers';
import { createDeviceForm, fetchBrands, fetchTypes } from "../../http/deviceAPI";
import { observer } from "mobx-react-lite";
import type { CreateProps, InfoItem } from '../../entities/global/types';

const CreateDevice: FC<CreateProps> = observer(({ show, onHide }) => {
	const { device } = useContext(Context)!
	const [name, setName] = useState('')
	const [price, setPrice] = useState(0)
	const [file, setFile] = useState<File | null>(null)
	const [info, setInfo] = useState<InfoItem[]>([])

	useEffect(() => {
		fetchTypes().then(data => device.setTypes(data))
		fetchBrands().then(data => device.setBrands(data))
	}, [])

	const addInfo = () => {
		setInfo([...info, { title: '', description: '', number: Date.now() }])
	}
	const removeInfo = (number: number) => {
		setInfo(info.filter(i => i.number !== number))
	}
	const changeInfo = (key: 'title' | 'description', value: string, number: number) => {
		setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i))
	}

	const selectFile = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
	}

	const uploadImage = async (file: File) => {
    	const formData = new FormData();
    	formData.append('file', file);
    	formData.append('upload_preset', 'unsigned_preset');

    	const response = await fetch(
      `https://api.cloudinary.com/v1_1/dxzzglv48/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
    const data = await response.json();
	 
    return data.secure_url;
  };

	const addDevice = async () => {
		try {
			let imgUrl = '';
      if (file) {
        imgUrl = await uploadImage(file);
      }
			const formData = new FormData()
		formData.append('name', name)
		formData.append('price', `${price}`)
		if(file) formData.append('img', imgUrl)
		formData.append('brandId', String(device.selectedBrand?.id ?? ''))
		formData.append('typeId', String(device.selectedType?.id ?? ''))
		formData.append('info', JSON.stringify(info))
		createDeviceForm(formData).then(() => onHide())
		} catch (e) {
			console.error('Ошибка при добавлении устройства', e);
		}
		
	}

	return (
		<Modal
			show={show}
			onHide={onHide}
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Добавить устройство
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Dropdown className="mt-2 mb-2">
						<Dropdown.Toggle>{device.selectedType?.name || "Выберите тип"}</Dropdown.Toggle>
						<Dropdown.Menu>
							{device.types.map(type =>
								<Dropdown.Item
									onClick={() => device.setSelectedType(type)}
									key={type.id}
								>
									{type.name}
								</Dropdown.Item>
							)}
						</Dropdown.Menu>
					</Dropdown>
					<Dropdown className="mt-2 mb-2">
						<Dropdown.Toggle>{device.selectedBrand?.name || "Выберите тип"}</Dropdown.Toggle>
						<Dropdown.Menu>
							{device.brands.map(brand =>
								<Dropdown.Item
									onClick={() => device.setSelectedBrand(brand)}
									key={brand.id}
								>
									{brand.name}
								</Dropdown.Item>
							)}
						</Dropdown.Menu>
					</Dropdown>
					<Form.Control
						value={name}
						onChange={e => setName(e.target.value)}
						className="mt-3"
						placeholder="Введите название устройства"
					/>
					<Form.Control
						value={price}
						onChange={e => setPrice(Number(e.target.value))}
						className="mt-3"
						placeholder="Введите стоимость устройства"
						type="number"
					/>
					<Form.Control
						className="mt-3"
						type="file"
						onChange={selectFile}
					/>
					<hr />
					<Button
						variant={"outline-dark"}
						onClick={addInfo}
					>
						Добавить новое свойство
					</Button>
					{info.map(i =>
						<Row className="mt-4" key={i.number}>
							<Col md={4}>
								<Form.Control
									value={i.title}
									onChange={(e) => changeInfo('title', e.target.value, i.number)}
									placeholder="Введите название свойства"
								/>
							</Col>
							<Col md={4}>
								<Form.Control
									value={i.description}
									onChange={(e) => changeInfo('description', e.target.value, i.number)}
									placeholder="Введите описание свойства"
								/>
							</Col>
							<Col md={4}>
								<Button
									onClick={() => removeInfo(i.number)}
									variant={"outline-danger"}
								>
									Удалить
								</Button>
							</Col>
						</Row>
					)}
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
				<Button variant="outline-success" onClick={addDevice}>Добавить</Button>
			</Modal.Footer>
		</Modal>
	);
});

export default CreateDevice;