import React from "react";
import Header from "../components/Header";
import AdminHeader from "../components/AdminHeader";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ComplainMain from "../components/Complain/ComplainMain";
import ComplainSide from "../components/Complain/ComplainSide";
import Test from "../components/Complain/test";

const ComplainScreen = (props) => {
  return (
    <div>
      {props.isAdmin === "true" ? <AdminHeader /> : <Header />}
      <Container fluid className="mx-auto">
        <Row>
          <Col className="ms-5">
            {/* <ComplainSide /> */}
            <Test />
          </Col>
          <Col>
            <ComplainMain />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ComplainScreen;
