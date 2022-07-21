import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { Alert } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { useMutation } from "react-query";

import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";

function LoginCard({}) {
  const navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

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

      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data user to database
      const response = await API.post("/login", body, config);

      console.log(response);

      if (response.status === 200) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });
      }

      if (response.data.data.user.status === "admin") {
        navigate("/ListCategory");
      } else {
        navigate("/HomeScreen");
      }

      if (response.status === 400) {
        const alert = (
          <Alert variant="danger" className="py-1">
            {response.error.message}
          </Alert>
        );
        setMessage(alert);
      }
      // Handling response here
    } catch (error) {
      if (error.response.data.status === "Failed") {
        const alert = (
          <Alert variant="danger" className="py-1">
            {error.response.data.message}
          </Alert>
        );
        setMessage(alert);
        console.log(error);
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            {error.response.data.error.message}
          </Alert>
        );
        setMessage(alert);
        console.log(error);
      }
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
                  Login
                </Card.Title>
                <Card.Body>
                  <Col>
                    <Form.Group className="mb-3" controlId="formGridEmail">
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridPassword">
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <div>
                      <Button
                        type="submit"
                        variant="danger"
                        className="w-100 mt-4"
                      >
                        Login
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

export default LoginCard;
