import { Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
//import star from '../assets/star.png'
import { DEVICE_ROUTE } from '../utils/consts';
import type { FC } from 'react';
import type { Device } from '../entities/device/types';

const DeviceItem: FC<{device: Device}> = ({ device }) => {
	const navigate = useNavigate()
	return (
    <Col md={2} className="mb-4 d-flex justify-content-center align-items-center">
      <div
        className="product-card"
        role="button"
        tabIndex={0}
        onClick={() => navigate(`${DEVICE_ROUTE}/${device.id}`)}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') navigate(`${DEVICE_ROUTE}/${device.id}`);
        }}
      >
        <div className="image-container">
          <img src={device.img} alt={device.name} className="product-image" />
        </div>
        <div className="info-section p-2">
          <h5 className="device-name mb-1">{device.name}</h5>
          {/*<div className="device-rating d-flex align-items-center gap-2 mb-2">
            <img src={star} alt="Star" width={20} height={20} />
            <span className="rating-number">{device.rating.toFixed(1)}</span>
          </div>*/}
          <div className="device-price">
            {device.price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}
          </div>
          {/*<p className="device-desc mb-0">{device.description || 'Краткое описание...'}</p>*/}
        </div>
      </div>
    </Col>
  );
};

export default DeviceItem;