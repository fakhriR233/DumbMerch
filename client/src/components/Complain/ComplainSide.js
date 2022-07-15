import React from "react";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Image from "react-bootstrap/Image";
import ChatPeople from "../../assets/images/Chat-People-1.jpg";

const ComplainSide = () => {
  return (
    <div>
      <p style={{ color: "white" }}> LEFT SIDE</p>
      <div>
        <Card
          className="h-100 d-flex"
          style={{ backgroundColor: "#0B0B0B", color: "white" }}
        >
          <Image
            className="mt-1"
            src={ChatPeople}
            style={{ width: "84px", height: "69px", objectFit: "cover" }}
            roundedCircle
          />
          <>
            <Card.Text className="text-start">Admin</Card.Text>
            <Card.Text
              className="text-start"
              style={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                width: "250px",
                color: "gray",
              }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
              voluptatum ut tempora omnis. Quo laboriosam quod laborum ipsa
              ipsam. Laborum eius maxime doloribus exercitationem ut ab sed
              consectetur labore illo!
            </Card.Text>
          </>
        </Card>
      </div>
    </div>
  );
};

export default ComplainSide;
