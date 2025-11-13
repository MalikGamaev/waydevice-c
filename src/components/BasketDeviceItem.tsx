import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import star from '../assets/star.png'
import type { Device } from '../entities/device/types'
import type { FC } from 'react'

const BasketDeviceItem: FC<{ device: Device }> = ({ device }) => {
  return (
    <Col md={3} className="mt-3">
      <div style={{ cursor: 'pointer', width: '100%', border: 'light' }} className="d-flex">
        <Image width={150} height={150} src={import.meta.env.VITE_API_URL + device.img} />
        <div className="text-black-50 mt-1 d-flex align-items-center">
          <div>{device.brandId}</div>
          <div className="d-flex align-items-center">
            <div>{device.rating}</div>
            <Image src={star} width={15} height={15} />
          </div>
          <div>{device.name}</div>
        </div>
      </div>
    </Col>
  )
}
export default BasketDeviceItem
