import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Col, Row, } from 'react-bootstrap';
import { Context } from './Providers';
import {  motion } from 'framer-motion';
import { Carousel } from 'antd';

const tapAnimation = {
  scale: 0.95,
  boxShadow: '0 0 15px rgba(0, 123, 255, 0.7)',
  transition: { type: 'spring' as const, stiffness: 300, damping: 20 },
  borderRadius: '6px'
};


const BrandBar = observer(() => {
	const { device } = useContext(Context)!
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
	const [activeSlideId, setActiveSlideId] = useState<number | null>(device.selectedBrand?.id || null);
	
	  useEffect(() => {
		 const handleResize = () => setIsMobile(window.innerWidth < 768);
		 window.addEventListener('resize', handleResize);
		 return () => window.removeEventListener('resize', handleResize);
	  }, []);
	
	  useEffect(() => {
		 setActiveSlideId(device.selectedBrand?.id || null);
	  }, [device.selectedBrand]);
	
	  const handleClick = (brandId: number) => {
		 device.setSelectedBrand(device.brands.find(b => b.id === brandId)!);
		 setActiveSlideId(brandId);
	  };

	  const devicesMap = device.brands.map((brand) => (
          <motion.div
            key={brand.id}
            whileTap={isMobile ? tapAnimation : { scale: 0.88, rotate: -5 }}
				className={activeSlideId === brand.id ? 'active-slide' : ''}
            whileHover={{ scale: 1.05, boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.2)', rotate: 0 }}
            style={{
              minWidth: '120px',
              cursor: 'pointer',
              userSelect: 'none',
              borderRadius: 12, 
				  color: brand.id === device.selectedBrand?.id ? 'white' : 'black',
              border: brand.id === device.selectedBrand?.id ? '3px solid #2575fc' : '1.5px solid #ddd',
              backgroundColor: brand.id === device.selectedBrand?.id ? '#2575fc' : 'white',
              padding: '16px',
              boxShadow: brand.id === device.selectedBrand?.id ? '0 6px 20px #2575fc' : 'none',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: 600,
              fontSize: '1rem',
              textAlign: 'center',
            }}
            role="button"
            tabIndex={0}
            onClick={() => handleClick(brand.id!)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                device.setSelectedBrand(brand);
              }
            }}
          >
            {brand.name}
          </motion.div>
        ))
	if (isMobile) {
    return (
      <Carousel
		  className='mt-3'
        dots={false}
        infinite={false}
        slidesToShow={1}
        slidesToScroll={1}
        swipeToSlide={true}
        responsive={[
          {
            breakpoint: 768,
            settings: { slidesToShow: 3 },
          },
          {
            breakpoint: 480,
            settings: { slidesToShow: 2 },
          },
          {
            breakpoint: 350,
            settings: { slidesToShow: 1 },
          },
        ]}
        style={{ overflow: 'visible', textAlign: 'center'}}
        // autoplay, speed и другие настройки по желанию
      >
        {devicesMap}
      </Carousel>
    );
  }

  // Десктопный вариант без слайдера
  return (
    <Row className="mb-3">
      <Col className="d-flex flex-wrap gap-3">
        {devicesMap}
      </Col>
    </Row>
  );
});	  


export default BrandBar;