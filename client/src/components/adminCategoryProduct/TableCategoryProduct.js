import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

// import { fakeCategory } from "../../fakeCategory";

import { API } from "../../config/api";
import { useMutation, useQuery } from "react-query";
import DeleteData from "../modal/DeleteData";

const TableCategoryProduct = () => {
  let navigate = useNavigate();
  const [show, setShow] = useState(false);

  //modal delete

  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let { data: categories, refetch } = useQuery("categoryCache", async () => {
    const response = await API.get("/categories");
    //console.log(response);
    return response.data.data;
  });

  console.log(categories);

  const addCategory = () => {
    navigate("/AddCategory");
  };

  const handleEdit = (id) => {
    navigate("/EditCategory/" + id);
  };

  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  // If confirm is true, execute delete data
  const deleteById = useMutation(async (id) => {
    try {
      await API.delete(`/category/${id}`);
      refetch();
    } catch (error) {
      console.log(error);
    }
  });

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
      <div className="p-5 mx-5 my-3">
        <Row>
          <Col>
            <h2 style={{ color: "white" }} className="mb-3">
              List Category
            </h2>
          </Col>
          <Col className="text-end">
            <Button
              onClick={addCategory}
              className="btn-dark"
              style={{ width: "150px" }}
            >
              New Category
            </Button>
          </Col>
          {categories?.length !== 0 ? (
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
                  <th>Category Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>
                      <Button
                        onClick={() => {
                          handleEdit(item.id);
                        }}
                        style={{ width: "150px" }}
                        variant="success"
                      >
                        Edit
                      </Button>
                      <Button
                        className="ms-2"
                        style={{ width: "150px" }}
                        variant="danger"
                        onClick={() => {
                          handleDelete(item.id);
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="text-center pt-5">
              <div className="mt-3">
                <p style={{ color: "white" }}>No data category</p>
              </div>
            </div>
          )}
        </Row>
      </div>
      <DeleteData
        setConfirmDelete={setConfirmDelete}
        show={show}
        handleClose={handleClose}
      />
    </div>
  );
};

export default TableCategoryProduct;
