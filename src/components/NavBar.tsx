import { useContext } from 'react'
import { Nav, Navbar, Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { Context } from './Providers'
import { useTheme } from '../context/ThemeProvider'

const NavBar = observer(() => {
  const navigate = useNavigate()
  const { user } = useContext(Context)!
  const { theme, toggleTheme } = useTheme()

  const colorArr = ['red', 'yellow', 'gray']

  const logOut = () => {
    user.setUser(null)
    user.setIsAuth(false)
    localStorage.removeItem('token')
    navigate(LOGIN_ROUTE)
  }

  return (
    <Navbar
      style={{ background: theme === 'light' ? 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)' : 'black' }}
      expand="lg"
      sticky="top"
    >
      <Container>
        <Navbar.Brand className="brand-logo" style={{ color: 'white' }} as={Link} to={SHOP_ROUTE}>
          WayDEVICE
        </Navbar.Brand>

        {/* Ваш кастомный переключатель темы */}
        <div
          className={`toggle-switch ${theme}`}
          onClick={toggleTheme}
          role="switch"
          aria-checked={theme === 'dark'}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') toggleTheme()
          }}
          style={{ marginRight: '1rem' }} // Чтобы не сливался с кнопкой тоггла
        >
          <div className="slider">
            {theme === 'light' ? <span className="icon">☀️</span> : <span className="icon">🌙</span>}
          </div>
        </div>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          {user.isAuth ? (
            <Nav className="ms-auto align-items-center">
              {user.user?.role === 'ADMIN' && (
                <Button variant="outline-light" className="mt-2 me-lg-2 mt-lg-0" onClick={() => navigate(ADMIN_ROUTE)}>
                  Админ панель
                </Button>
              )}

              <Button variant="outline-light" className="mt-2 mt-lg-0 me-lg-2" onClick={() => navigate(BASKET_ROUTE)}>
                Корзина
              </Button>

              <span
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'gray',
                  userSelect: 'none',
                }}
                className="text-white mt-2 mt-lg-0 me-lg-3 d-flex justify-content-center align-items-center"
              >
                {user.user?.email[0].toUpperCase()}
              </span>

              <Button variant="outline-light mt-2 mt-lg-0" className="" onClick={logOut}>
                Выйти
              </Button>
            </Nav>
          ) : (
            <Nav className="ms-auto mt-2 mt-lg-0">
              <Button variant="outline-light" onClick={() => navigate(LOGIN_ROUTE)}>
                Авторизация
              </Button>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
})

export default NavBar
