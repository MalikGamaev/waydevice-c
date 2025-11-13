import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import { Context } from './Providers'
import { AnimatePresence, motion } from 'framer-motion'
import { Carousel } from 'antd'
import { useTheme } from '../context/ThemeProvider'

const hoverAnimation = {
  scale: 1.05,
  boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
}

const tapAnimation = (theme: 'light' | 'dark') => {
  return {
    scale: 0.95,
    boxShadow: `0 0 15px ${theme === 'light' ? 'rgba(0, 123, 255, 0.7)' : 'rgba(255,255,255, 0.4)'}`,
    transition: { type: 'spring' as const, stiffness: 300, damping: 20 },
    borderRadius: '6px',
  }
}

const TypeBar = observer(() => {
  const { device } = useContext(Context)!
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768) // Пример брейкпоинта
  const { theme } = useTheme()
  const [activeSlideId, setActiveSlideId] = useState<number | null>(device.selectedType?.id || null)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    setActiveSlideId(device.selectedType?.id || null)
  }, [device.selectedType])

  const handleClick = (typeId: number) => {
    device.setSelectedType(device.types.find((t) => t.id === typeId)!)
    setActiveSlideId(typeId)
  }

  const devicesMap = device.types.map((type) => (
    <motion.div
      key={type.id}
      whileHover={hoverAnimation}
      style={{ marginBottom: isMobile ? 0 : 8 }}
      whileTap={tapAnimation(theme)}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={type.id === device.selectedType?.id ? 'custom-slide active-slide' : 'custom-slide'}
    >
      <ListGroup.Item
        action
        active={type.id === device.selectedType?.id}
        onClick={() => handleClick(type.id!)}
        style={{
          cursor: 'pointer',
          userSelect: 'none',
          textAlign: 'center',
          backgroundColor:
            type.id === device.selectedType?.id && isMobile && theme === 'light'
              ? '#fff'
              : type.id === device.selectedType?.id && isMobile && theme === 'dark'
                ? '#343434'
                : '',
        }}
      >
        {type.name}
      </ListGroup.Item>
    </motion.div>
  ))

  if (isMobile) {
    return (
      <Carousel
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
        style={{ overflow: 'visible' }}
        // autoplay, speed и другие настройки по желанию
      >
        {devicesMap}
      </Carousel>
    )
  }

  // Десктопный вариант без слайдера
  return (
    <ListGroup className="rounded">
      <AnimatePresence>{devicesMap}</AnimatePresence>
    </ListGroup>
  )
})

export default TypeBar
