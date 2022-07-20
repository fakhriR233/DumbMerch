import React,{useState} from "react";
import Table from "react-bootstrap/Table";
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from 'react-router-dom'
import { Col, Row } from "react-bootstrap";
import { home } from '../../dataDummy'; 

const TableListProduct = () => {
  const navigate = useNavigate()
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleSave = () => {setShow(false); navigate('/ListProduct')};
  const handleShow = () => setShow(true);

  const addProduct = () => {
    navigate('/AddProduct');
  };

  return (
    <div>
      <div>
        <div>
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Comfirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are You Sure You Want To Delete This ?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="success" onClick={handleSave}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <div className="p-5 mx-5 my-3">
        <Row>
          <Col>
          <h2 style={{ color: "white" }} className="mb-3">
            List Category
          </h2>
          </Col>
          <Col className="text-end">
            <Button
              onClick={addProduct}
              className="btn-dark"
              style={{ width: '150px' }}
            >
              New Product
            </Button>
        </Col>
        {home?.length !== 0 ? (
          <Table className="mt-2" variant="dark" bordered hover style={{ color: "white" }}>
            <thead>
              <tr>
                <th>No</th>
                <th>Photo</th>
                <th>Product Name</th>
                <th>Product Desc</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {home?.map((item, index) => (
              <tr>
                <td>1</td>
                <td>
                  <img 
                   src={item.image}
                   style={{
                     width: '80px',
                     height: '80px',
                     objectFit: 'cover',
                   }}
                   alt={item.name}
                  />
                </td>
                <td>{item.name}</td>
                <td>
                  <ShowMoreText
                    /* Default options */
                    lines={1}
                    more="show"
                    less="hide"
                    className="content-css"
                    anchorClass="my-anchor-css-class"
                    expanded={false}
                    width={280}>
                      {item.desc}
                  </ShowMoreText>
                </td>
                <td>Rp. {item.price}</td>
                <td>{item.qty}</td>
                <td className="d-flex">
                  <div>
                    <Link to="/EditProduct">
                      <Button style={{ width: "80px" }} variant="success">
                        Edit
                      </Button>
                    </Link>
                  </div>
                  <div className="ms-2">
                    <Button style={{ width: "80px" }} variant="danger" onClick={handleShow}>
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
              ))}
            </tbody>
          </Table>
        ) : (
        <div className="text-center pt-5">
        <div className="mt-3">No data product</div>
      </div>
      )}
        </Row>
      </div>
    </div>
  );
};

export default TableListProduct;
