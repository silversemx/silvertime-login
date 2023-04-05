import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// React Bootstrap
import { Container, Card, Form, Button } from 'react-bootstrap';

// Components
import CustomAlert from '../utils/CustomAlert';

const Login = () => {
	const [loginUserInfo, setLoginUserInfo] = useState({ username: '', password: '' });

	const alertInitialState = { display: false, type: '', msg: '' }
	const [alert, setAlert] = useState(alertInitialState);

	const validateMsgInfo = loginUserInfo.username === '' || loginUserInfo.password === '';
	
	const handleUserAction = (e) => {
		e.preventDefault();

		if (validateMsgInfo) {
			setAlert({ display: true, type: 'danger', msg: 'Campos faltantes!' });
			return;
		}
		setAlert(alertInitialState);
	}

	return (
		<Container className='login' fluid>
			<Card className='shadow-lg p-4 mb-5 bg-body-tertiary rounded' style={{ marginLeft: '235px', width: '30rem' }} border='light'>
				<Card.Body>
					<Card.Title className='text-center mt-3 mb-5' as={'h1'}>Iniciar Sesión</Card.Title>
						{alert.display &&
							<CustomAlert type={alert.type} msg={alert.msg} />
						}

						<Form className='mb-5'>
							<Form.Group className='mb-3' controlId='formBasicEmail'>
								<Form.Label className='fs-5'>Nombre de Usuario</Form.Label>
								<Form.Control
									size='lg'
									placeholder='Ingresa nombre de usuario'
									value={loginUserInfo.username}
									onChange={(e) => setLoginUserInfo({ ...loginUserInfo, username: e.target.value})}
								/>
							</Form.Group>
							<Form.Group className='mb-3' controlId='formBasicPassword'>
								<Form.Label className='fs-5'>Contraseña</Form.Label>
								<Form.Control
									size='lg'
									type='password'
									placeholder='Ingresa contraseña'
									value={loginUserInfo.password}
									onChange={(e) => setLoginUserInfo({ ...loginUserInfo, password: e.target.value})}
								/>
							</Form.Group>
						</Form>
						<div className='d-grid gap-2 py-3'>
							<Button className='btn-submit' size='lg' style={{ borderRadius: '35px' }} onClick={(e) => handleUserAction(e)}>
								Iniciar Sesión
							</Button>
						</div>
				</Card.Body>
			</Card>
		</Container>
	);
}

export default Login;
