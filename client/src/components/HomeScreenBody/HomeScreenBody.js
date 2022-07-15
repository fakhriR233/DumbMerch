import React from 'react'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';
import { home } from '../../dataDummy';
import Container from 'react-bootstrap/Container'
import { useState } from 'react';
import { Link } from 'react-router-dom'

const HomeScreenBody = () => {

    // const [data, setData] = useState([
    //     {
    //       "id": 1,
    //       "img": `${window.location.origin + '/logo512.png'}`,
    //       "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    //       "price": "800.000"
    //     },
    //     {
    //       "id": 2,
    //       "img": `${window.location.origin + '/logo192.png'}`,
    //       "title": "qui est esse",
    //       "price": "1.800.000"
    //     },
    //     {
    //       "id": 3,
    //       "img": `${window.location.origin + '/viper-mini.jpg'}`,
    //       "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    //       "price": "123.456"
    //     },
    //     {
    //       "id": 4,
    //       "img": `${window.location.origin + '/RTX-2060.jpg'}`,
    //       "title": "eum et est occaecati",
    //       "price": "823"
    //     },
    // ]) 

    // console.log(data);

  return (
    <div>
        <Container fluid className='p-3 mx-5'>
            <Card.Title style={Styles.Title}>Product</Card.Title>
            <Row xs={1} md={2} className="g-3">
                {home.map((items, id) => (
                    <Col style={Styles.CardCol} key={id}>
                    <Link to={`/DetailProduct/${id}`} style={{textDecoration: "none"}}>
                        <Card style={Styles.CardBody} >
                            <Card.Img variant="top" src={items.img} style={Styles.CardImg}/>
                            <Card.Body>
                            <Card.Title style={{color:'#F74D4D'}}>{items.title}</Card.Title>
                            <Card.Text>
                                Rp. {items.price}
                            </Card.Text>
                            <Card.Text className="mt-0">
                                Stock : 600
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                    </Col>
                ))}
            </Row>
        </Container>
    </div>
  )
}

const Styles = {
    Title: {
        color: "#F74D4D",
        fontSize: "26px",
        marginLeft : "20px"
    },
    CardCol : {
        width: '280px', 
        margin:'20px'
    },
    CardBody: {
        width: '18rem', 
        height: '30rem',
        backgroundColor: '#212121',
        color: 'white',
        textDecoration: "none"
    },
    CardImg: {
        objectFit: "cover", 
        height: "28rem"
    }
}

export default HomeScreenBody