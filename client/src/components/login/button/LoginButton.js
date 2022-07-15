import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import { Link } from 'react-router-dom'

const LoginButton = (props) => {

  return (
    <>
        <div style={styles.LoginRegister}>
            <Link to="/">
                <Button variant="danger" className='w-100 mt-4'>
                    Login
                </Button>
            </Link>

            <Link to="/Register">
                <Button variant="link" className='w-100 ms-4 mt-4' style={{textDecoration:"none", color:"white"}} >
                    Register
                </Button>
            </Link>
        </div>
    </>
  )
}

const styles = {
    LoginRegister : {
        display : "flex",
        maxWidth : "50%",
        color: "white"
    }
}

export default LoginButton