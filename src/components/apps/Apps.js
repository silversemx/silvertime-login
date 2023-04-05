import React from 'react';

// React Bootstrap
import { Container, Row, Card } from 'react-bootstrap';

// Components
import Header from '../main/Header';

const SingleApp = (props) => {
	const { img, title, desc } = props;

	return (
		<Card className='app-card shadow-lg p-0 mb-5 bg-body-tertiary rounded text-center'>
			<Card.Img className='app-card-img' src={img} />
			<Card.Body className='app-card-body'>
				<Card.Title as={'h2'}>{title}</Card.Title>
				<Card.Text className='mt-1'>{desc}</Card.Text>
			</Card.Body>
		</Card>
	);
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
					/>
					<SingleApp
						img={process.env.PUBLIC_URL + '/assets/server-status.png'}
						title='Overview'
						desc='Allows you to monitor services.'
					/>
				</Row>
			</Container>
		</Container>
	);
}

export default Apps;
