import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginCard({ checkUser }) {
  // const [email, setEmail] = useState(null);
  // const isLogin = true;
  // // const [pass, setPass] = useState('');
  const navigate = useNavigate();

  function whoIsUser() {
    if (checkUser === 'false') {
      navigate('/HomeScreen');
    } else {
      navigate('/ListCategory');
    }
  }

  return (
    <Card style={styles.LoginCard}>
      <div>
        <div className="container h-100">
          <div className="p-3">
            <Form className="row align-items-center">
              <Row className="mb-3 w-100">
                <Card.Title
                  className="mt-4 mb-4"
                  style={styles.label}
                >
                  Login
                </Card.Title>
                <Card.Body>
                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="formGridEmail"
                    >
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                      />
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="formGridPassword"
                    >
                      <Form.Control
                        type="password"
                        placeholder="Password"
                      />
                    </Form.Group>
                    <div>
                      <Button
                        onClick={whoIsUser}
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
    color: 'white',
    fontSize: '40px',
    textAlign: 'start',
  },
  LoginCard: {
    width: '28rem',
    borderRadius: '14px',
    backgroundColor: '#181818',
  },
};

export default LoginCard;
