import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { UserContext } from "../../context/userContext";

import AdminHeader from "../../components/AdminHeader";
import Contact from "../../components/AdminComplain/ContactComplain";
import Chat from "../../components/AdminComplain/ChatComplain";

import dataContact from "../../fakeContact";
import { io } from "socket.io-client";

let socket;

export default function ComplainAdmin() {
  const [state] = useContext(UserContext);
  const [contact, setContact] = useState(null);
  const [contacts, setContacts] = useState([]);

  const title = "Complain admin";
  document.title = "DumbMerch | " + title;

  useEffect(() => {
    socket = io("http://localhost:5000", {
      auth: {
        token: localStorage.getItem("token"), // we must set options to get access to socket server
      },
    });
    loadContacts();

    socket.on("connect_error", (err) => {
      console.error(err.message); // not authorized
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const loadContacts = () => {
    socket.emit("load user contact");

    socket.on("user contact", (data) => {
      console.log(data);

      let dataContacts = data.filter((item) => item.status !== "admin");

      dataContacts = dataContacts.map((item) => ({
        ...item,
        message: "Click here to start message",
      }));

      setContacts(dataContacts);
    });
  };

  useEffect(() => {
    socket = io("http://localhost:5000");
    loadContacts();

    return () => {
      socket.disconnect();
    };
  }, []);

  const onClickContact = (data) => {
    console.log(data);
    setContact(data);
  };

  return (
    <>
      <AdminHeader title={title} />
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
    </>
  );
}
