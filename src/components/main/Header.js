import React, { Fragment } from 'react';

// React Bootstrap
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

const Header = () => {
	return (
		<Navbar className='header' expand='lg'>
			<Container fluid>
				<Navbar.Brand href='/apps'>
					<img className='d-inline-block align-top' height={'30px'} alt='Silvertime'
						src={process.env.PUBLIC_URL + '/assets/silvertime.png'}
					/>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='navbarScroll' />
				<Navbar.Collapse id='navbarScroll'>
					<Nav className='ms-auto'>
						<NavDropdown 
							title={<Fragment><i className='bi bi-person-circle fs-5 me-2'></i>Account</Fragment>}
							id='userDropdown' 
							align='end'
							active
						>
							<NavDropdown.Item>
								<i className='bi bi-person-circle me-2'></i>Account
							</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item>
								<i className='bi bi-box-arrow-right me-2'></i>Log Out
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Header;
