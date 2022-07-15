import React from 'react'
import Logo from '../assets/images/Frame.png'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
  return (
    <div>
        <Navbar collapseOnSelect expand="lg" variant="dark" style={{color: "white"}}>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto ms-5">
                <img src={Logo} alt="Dumbmerch Logo" style={Styles.LogoSize}/>
                </Nav>
                <Nav className='me-5'>
                    <Nav.Link className="mx-3" href="/Complain" >Complain</Nav.Link>
                    <Nav.Link className="mx-3" eventKey={2} href="/ProfileScreen">
                    Profile
                    </Nav.Link>
                    <Nav.Link className="mx-3" eventKey={3} href="/">
                    Logout
                    </Nav.Link>
                </Nav>
                </Navbar.Collapse>
        </Navbar>
    </div>
  )
}

const Styles = {
    LogoSize: {
        width: "70px",
        margin: "15px"
    }
}

export default Header