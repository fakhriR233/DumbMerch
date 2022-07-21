import React from "react";
import Header from "../components/Header";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
//import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useMutation, useQuery } from "react-query";

import { API } from "../config/api";
import Image from "react-bootstrap/esm/Image";
import Button from "react-bootstrap/esm/Button";

const DetailProductScreen = () => {
  let navigate = useNavigate();
  // const [data, setData] = useState()
  let { id } = useParams();

  let { data: product } = useQuery("productCache", async () => {
    const response = await API.get("/product/" + id);
    console.log(response.data.data);
    return response.data.data.product;
  });

  console.log(product);

  const handleBuy = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const data = {
        idProduct: product.id,
        idSeller: product.user.id,
        price: product.price,
      };

      const body = JSON.stringify(data);

      await API.post("/transaction", body, config);

      navigate("/ProfileScreen");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div>
      <Header />
      <Container className="d-flex p-3 mx-auto mt-5 w-100">
        <Row className="justify-content-md-center">
          <Col xs lg="5">
            <div>
              <div>
                <Image
                  src={product?.image}
                  style={Styles.ImgSize}
                  alt={product?.name}
                />
              </div>
            </div>
          </Col>
          <Col xs lg="5">
            <div style={{ height: "555px", marginLeft: "50px" }}>
              <div>
                <div>
                  <h2 style={Styles.RedText}> {product?.name}</h2>
                </div>
                <div>
                  <h5 style={Styles.RedText}> Stock: {product?.qty}</h5>
                </div>
                <div>
                  <p style={Styles.WhiteText}> {product?.desc}</p>
                </div>
                <div style={Styles.Button}>
                  <div>
                    <p style={Styles.RedText} className="text-end my-3">
                      Rp. {product?.price}
                    </p>
                  </div>
                  <div className="d-flex justify-content-md-end mt-auto">
                    <Button variant="danger" className="p-2 w-100">
                      Buy
                    </Button>
                    <Link to="/CompareProduct">
                      <Button variant="warning" className="p-2 ms-2">
                        Compare
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const Styles = {
  RedText: {
    color: "red",
  },
  WhiteText: {
    color: "white",
    textAlign: "justify",
  },
  Button: {
    marginTop: "178px",
  },
  ImgSize: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
};

export default DetailProductScreen;
