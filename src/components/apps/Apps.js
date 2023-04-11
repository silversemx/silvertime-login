import React from 'react';

// React Bootstrap
import { Container, Row, Card } from 'react-bootstrap';

// Packages
import PropTypes from 'prop-types';

// Components
import Header from '../main/Header';

const SingleApp = (props) => {
	const { img, title, desc, url } = props;

	return (
		<Card
			className='app-card shadow-lg p-0 mb-5 bg-body-tertiary rounded text-center'
			onClick={() => window.location.href = url}
		>
			<Card.Img className='app-card-img' src={img} />
			<Card.Body className='app-card-body'>
				<Card.Title as={'h2'}>{title}</Card.Title>
				<Card.Text className='mt-1'>{desc}</Card.Text>
			</Card.Body>
		</Card>
	);
}

SingleApp.prototypes = {
	img: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	desc: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired
}

const Apps = () => {
	return (
		<Container className='p-0' fluid>
			<Header />

			<Container className='p-4' fluid>
				<h1>Applications</h1>

				<Row className='justify-content-evenly mt-5'>
					<SingleApp
						img={process.env.PUBLIC_URL + '/assets/setup.png'}
						title='Admin'
						desc='Allows you to configure the services to be monitored.'
						url={process.env.REACT_APP_ADMIN}
					/>
					<SingleApp
						img={process.env.PUBLIC_URL + '/assets/server-status.png'}
						title='Overview'
						desc='Allows you to monitor services.'
						url={process.env.REACT_APP_OVERVIEW}
					/>
				</Row>
			</Container>
		</Container>
	);
}

export default Apps;
