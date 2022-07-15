import {useState} from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function RegisterCard(setUserEmail) {
  // const [first, setFirst] = useState(setUserEmail.handleRegister)

  // console.log(setUserEmail);

  // const inputHandler = (e) => {
  //   setFirst(e.target.value)
  // }

  // console.log(setFirst);

  return (
    <Card style={styles.LoginCard}>
      <div>
        <div className="container h-100">
            <div className="p-3">
                <Form className="row align-items-center">
                <Row className="mb-3 w-100">
                    <Card.Title className="mt-4 mb-4" style={styles.label}>Register</Card.Title>
                    <Card.Body>
                      <Col>

                        <Form.Group className="mb-3" controlId="formGridName">
                        <Form.Control type="text" placeholder="Enter name" name="name"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridEmail">
                        <Form.Control type="email" placeholder="Enter email"/>
                        </Form.Group>
                      
                        <Form.Group className="mb-3" controlId="formGridPassword">
                        <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <div>
                          <Link to="/">
                            <Button variant="danger" className='w-100 mt-4'>
                                Login
                            </Button>
                          </Link>
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
  label : {
    color: "white",
    fontSize: "40px",
    textAlign: "start"
  },
  LoginCard : {
    width: '28rem',
    borderRadius: '14px',
    backgroundColor : "#181818"
  }
}

export default RegisterCard;