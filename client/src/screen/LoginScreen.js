import LoginCard from '../components/login/LoginCard';
import LoginImage from '../components/login/LoginImage';
import LoginButton from '../components/login/button/LoginButton';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Login(props) {
  return (
    <div>
      <div style={styles.LoginScreen}>
        <Row>
          <Col lg={8}>
            <LoginImage />
            <LoginButton />
          </Col>
          <Col lg={4}>
            <LoginCard checkUser={props.isAdmin} />
          </Col>
        </Row>
      </div>
    </div>
  );
}

const styles = {
  LoginScreen: {
    margin: 0,
    padding: '250px 80px',
  },
};

export default Login;
