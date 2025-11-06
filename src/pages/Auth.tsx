import { observer } from 'mobx-react-lite';
import { useContext, useState } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../components/Providers';
import { login, registration } from '../http/userAPI';
import axios from 'axios'

import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';


const Auth = observer(() => {
	const { user } = useContext(Context)!
	const location = useLocation()
	const navigate = useNavigate()
	const isLogin = location.pathname === LOGIN_ROUTE
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const click = async () => {
		try {
			let data;
			if (isLogin) {
			 data = await login(email, password)
			 
			} else {
			 data = await registration(email, password)
			}

			user.setUser(data)
			user.setIsAuth(true)
			navigate(SHOP_ROUTE)
		} catch (e) {
			if (axios.isAxiosError(e)) {
      		alert(e.response?.data.message);
    		} else {
      		alert('Произошла неизвестная ошибка');
    		}
		}

	}

	return (
		<Container
  className="d-flex justify-content-center align-items-center"
  style={{ height: window.innerHeight - 54}}
>
  <Card style={{ width: 600 }} className="p-4 p-sm-5">
    <h2 className="text-center">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>

    <Form className="d-flex flex-column">
      <Form.Control
        className="mt-3"
        placeholder="Введите ваш email..."
        value={email}
        onChange={e => setEmail(e.target.value)}
        type="email"
      />
      <Form.Control
        className="mt-3"
        placeholder="Введите ваш пароль..."
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="password"
      />

      <div className="auth-text d-flex justify-content-between align-items-center mt-3">
        {isLogin ? (
          <div>
            Нет аккаунта?{' '}
            <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
          </div>
        ) : (
          <div>
            Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
          </div>
        )}

        <Button variant="outline-success" onClick={click}>
          {isLogin ? 'Войти' : 'Регистрация'}
        </Button>
      </div>
    </Form>
  </Card>
</Container>
	);
});

export default Auth;