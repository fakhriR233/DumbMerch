import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
//import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
//import { home } from "../../dataDummy";
//import ShowMoreText from "react-show-more-text";
import { useMutation, useQuery } from "react-query";

import { API } from "../../config/api";
import DeleteData from "../modal/DeleteData";

const TableListProduct = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  let { data: products, refetch } = useQuery("productsCache", async () => {
    const response = await API.get("/products");

    // console.log(response.data.data);
    return response.data.data.product;
  });

  //console.log(products);

  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addProduct = () => {
    navigate("/AddProduct");
  };

  const handleUpdate = (id) => {
    navigate("/EditProduct/" + id);
  };

  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  const deleteById = useMutation(async (id) => {
    try {
      await API.delete(`/product/${id}`);
      refetch();
    } catch (error) {
      console.log(error);
    }
  });

  // Call function for handle close modal and execute delete data with useEffect here ...
  useEffect(() => {
    if (confirmDelete) {
      // Close modal confirm delete data
      handleClose();
      // execute delete data by id function
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  return (
    <div>
      <DeleteData
        setConfirmDelete={setConfirmDelete}
        show={show}
        handleClose={handleClose}
      />
      <div className="p-5 mx-5 my-3">
        <Row>
          <Col>
            <h2 style={{ color: "white" }} className="mb-3">
              List Product
            </h2>
          </Col>
          <Col className="text-end">
            <Button
              onClick={addProduct}
              className="btn-dark"
              style={{ width: "150px" }}
            >
              New Product
            </Button>
          </Col>
          {products?.length !== 0 ? (
            <Table
              className="mt-2"
              variant="dark"
              bordered
              hover
              style={{ color: "white" }}
            >
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
                {products?.map((item, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={item.image}
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                        }}
                        alt={item.name}
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>
                      <p className="text-desc-product-admin">{item.desc}</p>
                    </td>
                    <td>Rp. {item.price}</td>
                    <td>{item.qty}</td>
                    <td
                      className="d-flex justify-content-center"
                      style={{ height: "80px" }}
                    >
                      <div>
                        <Button
                          style={{ width: "80px" }}
                          variant="success"
                          onClick={() => {
                            handleUpdate(item.id);
                          }}
                        >
                          Edit
                        </Button>
                      </div>
                      <div className="ms-2">
                        <Button
                          style={{ width: "80px" }}
                          variant="danger"
                          onClick={() => {
                            handleDelete(item.id);
                          }}
                        >
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
              <div className="mt-3" style={{ color: "white" }}>
                No data product
              </div>
            </div>
          )}
        </Row>
      </div>
    </div>
  );
};

export default TableListProduct;
