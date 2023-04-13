import React, { useEffect, useState } from 'react';

// React Bootstrap
import { Alert } from 'react-bootstrap';

// Packages
import PropTypes from 'prop-types';

const CustomAlert = (props) => {
	const { type, msg } = props;

	const [icon, setIcon] = useState('');

	useEffect(() => {
		switch (type) {
			case 'success':
				setIcon('bi bi-check-circle-fill text-success me-2');
			break;
			case 'danger':
				setIcon('bi bi-exclamation-triangle-fill text-danger me-2');
			break;
			case 'info':
				setIcon('bi bi-info-circle-fill text-info me-2');
			break;
			default:
				break;
		}
	}, [type]);

	return ( 
		<Alert variant={type}>
			<i className={icon}></i> {msg}
		</Alert>
	);
}

CustomAlert.propTypes = {
	type: PropTypes.string.isRequired,
	msg: PropTypes.string.isRequired
}

export default CustomAlert;
