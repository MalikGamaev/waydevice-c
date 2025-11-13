import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import { Context } from './Providers'
import DeviceItem from './DeviceItem'
import { Carousel } from 'antd'

const DeviceList = observer(() => {
  const { device } = useContext(Context)!
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768) // Пример брейкпоинта

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isMobile ? (
    <Carousel
      dots={true}
      dotPosition="bottom"
      autoplay
      infinite={true}
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
      {device.devices.map((d) => (
        <DeviceItem key={d.id} device={d} />
      ))}
    </Carousel>
  ) : (
    <Row className="d-flex g-2 gap-xxl-4 ">
      {device.devices.map((d) => (
        <DeviceItem key={d.id} device={d} />
      ))}
    </Row>
  )
})

export default DeviceList
