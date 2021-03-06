import React, { useEffect, useState } from "react";
import Header from "../components/Header";
//import AdminHeader from "../components/AdminHeader";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Contact from "../components/AdminComplain/ContactComplain";
import Chat from "../components/AdminComplain/ChatComplain";
//import ComplainMain from "../components/Complain/ComplainMain";
//import ComplainSide from "../components/Complain/ComplainSide";
//import Test from "../components/Complain/test";

// import package here
import { io } from "socket.io-client";

// init variable here
let socket;

const ComplainScreen = () => {
  const [contact, setContact] = useState(null);
  const [contacts, setContacts] = useState([]);

  const title = "Complain";
  document.title = "DumbMerch | " + title;

  const loadContact = () => {
    socket.emit("load admin contact");

    socket.on("admin contact", (data) => {
      console.log(data);

      const dataContact = {
        ...data,
        message: "Click here to start message",
      };
      setContacts([dataContact]);
    });
  };

  useEffect(() => {
    socket = io("http://localhost:5000");
    loadContact();

    return () => {
      socket.disconnect();
    };
  }, []);

  const onClickContact = (data) => {
    console.log(data);
    setContact(data);
  };

  // const dataContact = [
  //   {
  //     id: 1,
  //     name: "Admin",
  //     chat: "Yes, Is there anything I can help",
  //     img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
  //   },
  //   {
  //     id: 2,
  //     name: "Admin 2",
  //     chat: "Hello World",
  //     img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
  //   },
  // ];

  return (
    <div>
      <Header title={title} />
      <Container fluid style={{ height: "89.5vh" }}>
        <Row>
          <Col
            md={3}
            style={{ height: "89.5vh" }}
            className="px-3 border-end border-dark overflow-auto"
          >
            <Contact
              dataContact={contacts}
              clickContact={onClickContact}
              contact={contact}
            />
          </Col>
          <Col md={9} style={{ maxHeight: "89.5vh" }} className="px-0">
            <Chat contact={contact} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ComplainScreen;
