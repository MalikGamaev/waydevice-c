import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import { Col, ListGroup, Row } from 'react-bootstrap'
import { Context } from './Providers'
import { AnimatePresence, motion } from 'framer-motion'
import { Carousel } from 'antd'
import { useTheme } from '../context/ThemeProvider'

const tapAnimation = (theme: 'light' | 'dark') => {
  return {
    scale: 0.95,
    boxShadow: `0 0 15px ${theme === 'light' ? 'rgba(0, 123, 255, 0.7)' : 'rgba(255,255,255, 0.4)'}`,
    transition: { type: 'spring' as const, stiffness: 300, damping: 20 },
  }
}

const BrandBar = observer(() => {
  const { device } = useContext(Context)!
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const { theme } = useTheme()
  const [activeSlideId, setActiveSlideId] = useState<number | null>(device.selectedBrand?.id || null)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    setActiveSlideId(device.selectedBrand?.id || null)
  }, [device.selectedBrand])

  const handleClick = (brandId: number) => {
    device.setSelectedBrand(device.brands.find((b) => b.id === brandId)!)
    setActiveSlideId(brandId)
  }

  const devicesMap = device.brands.map((brand) => (
    <motion.div
      key={brand.id}
      whileTap={isMobile ? tapAnimation(theme) : { scale: 0.88, rotate: -5 }}
      whileHover={{ scale: 1.05, boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.2)', rotate: 0 }}
      style={{
        boxShadow:
          theme === 'light'
            ? brand.id === device.selectedBrand?.id
              ? '0 6px 20px #2575fc'
              : 'none'
            : brand.id === device.selectedBrand?.id
              ? '0 6px 20px #495057'
              : 'none',
        fontWeight: 600,
        fontSize: '1rem',
        textAlign: 'center',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={brand.id === device.selectedBrand?.id ? 'custom-slide active-slide' : 'custom-slide'}
    >
      <ListGroup.Item
        action
        active={brand.id === device.selectedBrand?.id}
        onClick={() => handleClick(brand.id!)}
        style={{
          cursor: 'pointer',
          userSelect: 'none',
          textAlign: 'center',
          minWidth: !isMobile ? '120px' : '',
          padding: !isMobile ? '16px' : '',
          backgroundColor:
            brand.id === device.selectedBrand?.id && isMobile && theme === 'light'
              ? '#fff'
              : brand.id === device.selectedBrand?.id && isMobile && theme === 'dark'
                ? '#343434'
                : '',
        }}
      >
        {brand.name}
      </ListGroup.Item>
    </motion.div>
  ))
  if (isMobile) {
    return (
      <Carousel
        className="mt-3"
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
        style={{ overflow: 'visible', textAlign: 'center' }}
        // autoplay, speed и другие настройки по желанию
      >
        {devicesMap}
      </Carousel>
    )
  }

  // Десктопный вариант без слайдера
  return (
    <ListGroup className="mb-3">
      <AnimatePresence>
        <Col className="d-flex flex-wrap gap-3">{devicesMap}</Col>
      </AnimatePresence>
    </ListGroup>
  )
})

export default BrandBar
