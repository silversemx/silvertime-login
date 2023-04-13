import React, { useEffect } from 'react';

// React Bootstrap
import { Container } from 'react-bootstrap';

const Authentication = () => {
	useEffect(() => {
		window.location.href = process.env.REACT_APP_LOGIN;
	}, []);

	return (
		<Container style={{ height: '60vh' }}>
			<h1>Redirecting...</h1>
		</Container>
	);
}

export default Authentication;
