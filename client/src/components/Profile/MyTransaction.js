import React from "react";
import Card from "react-bootstrap/Card";
import ViperMini from "../../assets/images/viper-mini.jpg";
import Image from "react-bootstrap/esm/Image";
import DumbMerchLogo from "../../assets/images/Frame.png";
import { useQuery } from "react-query";
import { API } from "../../config/api";

import dateFormat from "dateformat";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

const MyTransaction = () => {
  let { data: transactions } = useQuery("transactionsCache", async () => {
    const response = await API.get("/transaction");

    //console.log(response.data.dataTransaction);
    return response.data.dataTransaction;
  });

  return (
    <div>
      <div className="my-3 mx-3 p-3">
        <h2 style={RedText}>My Transaction</h2>
      </div>
      {transactions?.length !== 0 ? (
        <div>
          {transactions?.map((item, index) => (
            <>
              <div className="ms-4">
                <Card style={{ width: "34rem", backgroundColor: "#1A1A1A" }}>
                  <div>
                    <Row>
                      <Card.Body className="d-flex">
                        <Col xs="3">
                          <div>
                            <Image
                              src={item.product.image}
                              style={{
                                width: "90px",
                                height: "145px",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                        </Col>
                        <Col xs="6">
                          <div>
                            <div className="my-0 ms-3">
                              <Card.Text style={RedText}>
                                {item.products.name}
                              </Card.Text>
                              <Card.Text style={RedText}>
                                {dateFormat(
                                  item.createdAt,
                                  "dddd, d mmmm yyyy"
                                )}
                              </Card.Text>
                              <Card.Text style={{ color: "#FFFFFF" }}>
                                Price: Rp. {item.price}
                              </Card.Text>
                            </div>
                            <div className="ms-3 mt-4">
                              <Card.Text style={{ color: "#FFFFFF" }}>
                                Sub Total: Rp. {item.price}
                              </Card.Text>
                            </div>
                          </div>
                        </Col>
                        <Col xs="3">
                          <div>
                            <Image src={DumbMerchLogo} style={DumbLogo} />
                          </div>
                        </Col>
                      </Card.Body>
                    </Row>
                  </div>
                </Card>
              </div>
            </>
          ))}
        </div>
      ) : (
        <div>
          <div className="mt-1 mx-3 px-3" style={{ color: "white" }}>
            No Transaction
          </div>
        </div>
      )}
    </div>
  );
};

const RedText = {
  color: "red",
};

const DumbLogo = {
  width: "70px",
  marginTop: "40px",
};
export default MyTransaction;
