import React from 'react';

// Packages
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Login from './components/auth/Login';

// Redux
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
	return (
		<Provider store= { store }>
			<Router>
				<div className='App'>
					<Routes>
						<Route path='/' element={ <Login /> } exact />
					</Routes>
				</div>
			</Router>
		</Provider>
	);
}

export default App;
