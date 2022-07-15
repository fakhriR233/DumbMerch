import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import ChatPeople from "../../assets/images/Chat-People-1.jpg";

const ComplainMain = () => {
  return (
    <div>
      <div>
        <div style={{ display: "flex" }}>
          <div>
            <Image
              src={ChatPeople}
              alt="Test"
              roundedCircle
              style={{
                objectFit: "cover",
                marginRight: "40px",
                height: "40px",
                width: "45px",
              }}
            />
          </div>
          <div
            style={{
              color: "white",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              fontSize: "12px",
            }}
          >
            <p>Admin</p>
            <p>Hey Admin i need some help helppppppppppp</p>
          </div>
        </div>
      </div>
      <div>
        <Form.Control
          type="text"
          placeholder="Send Message"
          style={{
            position: "absolute",
            bottom: "0",
            marginBottom: "25px",
            maxWidth: "550px",
          }}
        />
      </div>
    </div>
  );
};

export default ComplainMain;
