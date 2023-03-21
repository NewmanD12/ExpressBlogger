import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav'

const NavBar = () => {
    return (
        <Nav className="justify-content-center">
            <Nav.Item>
                <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/create-new">Create New</Nav.Link>
            </Nav.Item>
        </Nav>
    )
}
export default NavBar;