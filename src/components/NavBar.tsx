import { useContext } from 'react';
import {Nav, Navbar, Container, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Context } from './Providers';

const NavBar = observer(() => {
	const navigate = useNavigate();
	const { user } = useContext(Context)!;



	const logOut = () => {
		user.setUser(null);
		user.setIsAuth(false);
		localStorage.removeItem('token');
		navigate(LOGIN_ROUTE);
	};

	return (
		<Navbar style={{background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)'}} expand="lg" sticky="top">
      <Container>
        <Navbar.Brand className='brand-logo' style={{color: 'white'}} as={Link} to={SHOP_ROUTE}>
          WayDEVICE
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {user.isAuth ? (
            <Nav className="ms-auto align-items-center">
					{user.user?.role === 'ADMIN' && (
						<Button
                variant="outline-light"
                className="me-2"
                onClick={() => navigate(ADMIN_ROUTE)}
              >
                Админ панель
              </Button>
					)}	
              <Button
                variant="outline-light"
                className="me-2"
                onClick={() => navigate(BASKET_ROUTE)}
              >
                Корзина
              </Button>

              <span className="text-white me-3">{user.user?.email}</span>

              <Button variant="outline-light" onClick={logOut}>
                Выйти
              </Button>
            </Nav>
          ) : (
            <Nav className="ms-auto">
              <Button variant="outline-light" onClick={() => navigate(LOGIN_ROUTE)}>
                Авторизация
              </Button>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
	);
});

export default NavBar;