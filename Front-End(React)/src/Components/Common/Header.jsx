import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <NavLink to=''>
                    <Navbar.Brand>Navbar</Navbar.Brand>
                </NavLink>
                <Nav className="me-auto">
                    <Nav.Link as={NavLink} to=''>Home</Nav.Link>
                    <Nav.Link as={NavLink} to='college/list'>College</Nav.Link>
                    <Nav.Link as={NavLink} to='student/list'>Student</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header;