import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// React Bootstrap
import { Container, Card, Form, Button } from 'react-bootstrap';

// Packages
import { sha256 } from 'js-sha256';
import Lottie from 'lottie-react';
import BounceLoader from 'react-spinners/BounceLoader';

// Components
import CustomAlert from '../utils/CustomAlert';

// Actions
import { user_login } from '../../redux/actions/authActions';

// Utils
import errorExists from '../../utils/errorExists';

// Icons
import checkAnimation from '../../static/icons/checkAnimation.json';

const Login = () => {
	const dispatch = useDispatch();

	const { login_loading, login_success, auth_errors } = useSelector(state => state.auth);
	const [loginUserInfo, setLoginUserInfo] = useState({ email: '', password: '' });
	const alertInitialState = { display: false, type: '', msg: '' }
	const [alert, setAlert] = useState(alertInitialState);

	const lottieRef = useRef(null);

	const validateMsgInfo = loginUserInfo.email === '' || loginUserInfo.password === '';
	
	const handleUserAction = (e) => {
		e.preventDefault();

		if (validateMsgInfo) {
			setAlert({ display: true, type: 'danger', msg: 'Missing fields!' });
			return;
		}
		setAlert(alertInitialState);

		let user =  { ...loginUserInfo };
		user.password = sha256(user.password);

		dispatch(user_login(user));
	}

	return (
		<Container className='login' fluid>
			<Card className='shadow-lg p-4 mb-5 bg-body-tertiary rounded' style={{ marginLeft: '235px', width: '30rem' }} border='light'>
				<Card.Body>
					<Card.Title className='text-center mt-3 mb-4' as={'h1'}>Log In</Card.Title>
						{alert.display &&
							<CustomAlert type={alert.type} msg={alert.msg} />
						}

						{errorExists(auth_errors, 'user_login') &&
							<CustomAlert type='danger' msg={auth_errors['user_login'].msg} />
						}

						<Form className='mb-5'>
							<Form.Group className='mb-3' controlId='formBasicEmail'>
								<Form.Label className='fs-5'>Email</Form.Label>
								<Form.Control
									size='lg'
									placeholder='Type your email'
									value={loginUserInfo.email}
									onChange={(e) => setLoginUserInfo({ ...loginUserInfo, email: e.target.value})}
								/>
							</Form.Group>
							<Form.Group className='mb-3' controlId='formBasicPassword'>
								<Form.Label className='fs-5'>Password</Form.Label>
								<Form.Control
									size='lg'
									type='password'
									placeholder='Type your password'
									value={loginUserInfo.password}
									onChange={(e) => setLoginUserInfo({ ...loginUserInfo, password: e.target.value})}
								/>
							</Form.Group>
						</Form>
						<div className='d-grid gap-2 py-3'>
							<Button className='btn-submit py-1' size='lg' style={{ borderRadius: '35px' }} onClick={(e) => handleUserAction(e)}>
								{login_success
									?	<Lottie
											loop={false}
											lottieRef={lottieRef}
											animationData={checkAnimation}
											style={{ height: '38px' }}
										/>
									:	login_loading
										?	<div className='d-flex justify-content-center py-1'>
												<BounceLoader color='white' size={30} speedMultiplier={1.5} />
											</div>
										:	<p className='m-0 py-1'>Log In</p>
								}
							</Button>
						</div>
				</Card.Body>
			</Card>
		</Container>
	);
}

export default Login;
