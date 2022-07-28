import React, { useContext } from "react";
import Logo from "../assets/images/Frame.png";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const AdminHeader = () => {
  const [state, dispatch] = useContext(UserContext);

  let Navigate = useNavigate();

  function logoutHandler() {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    Navigate("/");
  }
  function complainHandler() {
    Navigate("/ComplainAdmin");
  }
  function categoryHandler() {
    Navigate("/ListCategory");
  }
  function productHandler() {
    Navigate("/ListProduct");
  }

  function homeHandler() {
    Navigate("/ListCategory");
  }

  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        style={{ color: "white" }}
      >
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto ms-5">
            <img
              src={Logo}
              alt="Dumbmerch Logo"
              style={Styles.LogoSize}
              onClick={homeHandler}
            />
          </Nav>
          <Nav className="me-5">
            <Nav.Link className="mx-3" onClick={complainHandler}>
              Complain
            </Nav.Link>
            <Nav.Link className="mx-3" eventKey={2} onClick={categoryHandler}>
              Category
            </Nav.Link>
            <Nav.Link className="mx-3" eventKey={2} onClick={productHandler}>
              Product
            </Nav.Link>
            <Nav.Link className="mx-3" eventKey={3} onClick={logoutHandler}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

const Styles = {
  LogoSize: {
    width: "70px",
    margin: "15px",
    cursor: "pointer",
  },
};

export default AdminHeader;
