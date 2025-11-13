import { useState, type FC } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { createBrand } from '../../http/deviceAPI'
import type { CreateProps } from '../../entities/global/types'

const CreateBrand: FC<CreateProps> = ({ show, onHide }) => {
  const [value, setValue] = useState('')

  const addBrand = () => {
    createBrand({ name: value })
      .then(() => {
        setValue('')
        onHide()
      })
      .catch((error) => alert(error.response.data.message))
  }
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Добавить бренд</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={'Введите название бренда'}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={addBrand}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateBrand
