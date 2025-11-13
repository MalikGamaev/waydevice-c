import { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import CreateBrand from '../components/modals/CreateBrand'
import CreateType from '../components/modals/CreateType'
import DeviceModal from '../components/modals/DeviceModal'
import { useTheme } from '../context/ThemeProvider'

const Admin = () => {
  const { theme } = useTheme()
  const [brandVisible, setBrandVisible] = useState(false)
  const [typeVisible, setTypeVisible] = useState(false)
  const [deviceVisible, setDeviceVisible] = useState(false)

  return (
    <Container className="d-flex flex-column">
      <Button
        variant={theme === 'light' ? 'primary' : 'dark'}
        className="mt-4 p-2"
        onClick={() => setTypeVisible(true)}
      >
        Добавить тип
      </Button>
      <Button
        variant={theme === 'light' ? 'primary' : 'dark'}
        className="mt-4 p-2"
        onClick={() => setBrandVisible(true)}
      >
        Добавить бренд
      </Button>
      <Button
        variant={theme === 'light' ? 'primary' : 'dark'}
        className="mt-4 p-2"
        onClick={() => setDeviceVisible(true)}
      >
        Добавить устройство
      </Button>
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
      <DeviceModal show={deviceVisible} onHide={() => setDeviceVisible(false)} titleModal={'Добавить'} />
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
    </Container>
  )
}

export default Admin
