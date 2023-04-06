import React from 'react';

// Packages
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Login from './components/auth/Login';
import Apps from './components/apps/Apps';
import Authentication from './components/main/Authentication';
import PrivateRoute from './router/PrivateRoute';

// Redux
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
	return (
		<Provider store={ store }>
			<Router>
				<div className='App'>
					<Routes>
						<Route path='/auth' element={ <Authentication /> } />

						<Route path='/' element={ <Login /> } />
						
						<Route element={ <PrivateRoute /> }>
							<Route path='/apps' element={ <Apps /> } />
						</Route>
					</Routes>
				</div>
			</Router>
		</Provider>
	);
}

export default App;
