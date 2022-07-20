import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";

function RegisterCard() {
  let navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = form;

  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configure Content-type
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data user to database
      const response = await API.post("/register", body, config);

      console.log(response);

      // Handling response here
      if (response.data.status === "Success") {
        const alert = (
          <Alert variant="success" className="py-1">
            Register Success
          </Alert>
        );
        setMessage(alert);
        setForm({
          name: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  return (
    <Card style={styles.LoginCard}>
      {message && message}
      <div>
        <div className="container h-100">
          <div className="p-3">
            <Form
              className="row align-items-center"
              onSubmit={(e) => handleSubmit.mutate(e)}
            >
              <Row className="mb-3 w-100">
                <Card.Title className="mt-4 mb-4" style={styles.label}>
                  Register
                </Card.Title>
                <Card.Body>
                  <Col>
                    <Form.Group className="mb-3" controlId="formGridName">
                      <Form.Control
                        type="text"
                        placeholder="Enter name"
                        name="name"
                        value={name}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridEmail">
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridPassword">
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <div>
                      <Button
                        type="submit"
                        variant="danger"
                        className="w-100 mt-4"
                      >
                        Register
                      </Button>
                    </div>
                  </Col>
                </Card.Body>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </Card>
  );
}

const styles = {
  label: {
    color: "white",
    fontSize: "40px",
    textAlign: "start",
  },
  LoginCard: {
    width: "28rem",
    borderRadius: "14px",
    backgroundColor: "#181818",
  },
};

export default RegisterCard;
