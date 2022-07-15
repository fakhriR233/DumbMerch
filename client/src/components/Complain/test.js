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
        <div style={{ display: "flex" }}>
          <div>
            <Image
              src={ChatPeople}
              alt="Test"
              roundedCircle
              style={{
                objectFit: "cover",
                marginRight: "20px",
                width: "70px",
                height: "75px",
              }}
            />
          </div>
          <div
            style={{
              color: "white",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            <p>Admin</p>
            <p>Hey Admin i need some help helppppppppppp</p>
          </div>

          <div
            className="ms-3"
            style={{
              borderLeft: "1px solid green",
              height: "520px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ComplainSide;
