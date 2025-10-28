import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, type FC } from 'react';
import { createType } from '../../http/deviceAPI';
import type { CreateProps } from '../../entities/global/types';

const CreateType: FC<CreateProps> = ({ show, onHide }) => {
	const [value, setValue] = useState('');

	const addType = () => {
		createType({ name: value })
			.then(() => {
				setValue('');
				onHide();
			})
			.catch((error) => alert(error.response.data.message));
	};
	return (
		<Modal
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			show={show}
			onHide={onHide}
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">Добавить новый тип</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Control
						value={value}
						onChange={(e) => {
							setValue(e.target.value);
						}}
						placeholder="Введите название типа"
					></Form.Control>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant={'outline-danger'}
					onClick={onHide}
				>
					Закрыть
				</Button>
				<Button
					variant={'outline-success'}
					onClick={addType}
				>
					Добавить
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
export default CreateType;