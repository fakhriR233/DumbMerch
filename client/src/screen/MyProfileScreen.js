import React from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import ProfilePictureCard from "../components/Profile/ProfilePictureCard";
import MyTransaction from "../components/Profile/MyTransaction";
import Header from "../components/Header";

function MyProfileScreen() {
  return (
    <div>
      <Header />
      <div>
        <Row>
          <Col>
            <ProfilePictureCard />
          </Col>
          <Col>
            <MyTransaction />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default MyProfileScreen;
