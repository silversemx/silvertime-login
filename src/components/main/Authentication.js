import React, { useEffect } from 'react';

const Authentication = () => {
	useEffect(() => {
		window.location.href = process.env.REACT_APP_LOGIN;
	}, []);

	return (
		<div>
			<h1>Redirecting...</h1>
		</div>
	);
}

export default Authentication;
