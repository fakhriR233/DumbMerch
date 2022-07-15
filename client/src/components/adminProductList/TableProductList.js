import React,{useState} from "react";
import Table from "react-bootstrap/Table";
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from 'react-router-dom'

const TableListProduct = () => {
  const Navigate = useNavigate()
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleSave = () => {setShow(false); Navigate('/ListProduct')};
  const handleShow = () => setShow(true);

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
      <div className="p-4 mx-5 my-3">
        <h2 style={{ color: "white" }} className="mb-3">
          List Category
        </h2>
        <Table variant="dark" bordered hover style={{ color: "white" }}>
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
            <tr>
              <td>1</td>
              <td>Photo</td>
              <td>Mouse</td>
              <td>Lorem Ipsu Dolor sit amet</td>
              <td>500.000</td>
              <td>600</td>
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
            <tr>
              <td>2</td>
              <td>Photo</td>
              <td>Mouse</td>
              <td>Lorem Ipsu Dolor sit amet</td>
              <td>500.000</td>
              <td>600</td>
              <td>
                <Link to="/EditProduct">
                <Button style={{ width: "80px" }} variant="success">
                  Edit
                </Button>
                </Link>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Photo</td>
              <td>Mouse</td>
              <td>Lorem Ipsu Dolor sit amet</td>
              <td>500.000</td>
              <td>600</td>
              <td>
              <Link to="/EditProduct">
                <Button style={{ width: "80px" }} variant="success">
                  Edit
                </Button>
              </Link>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TableListProduct;
