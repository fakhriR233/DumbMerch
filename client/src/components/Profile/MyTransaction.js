import React from "react";
import Card from "react-bootstrap/Card";
import ViperMini from "../../assets/images/viper-mini.jpg";
import Image from "react-bootstrap/esm/Image";
import DumbMerchLogo from "../../assets/images/Frame.png";

const MyTransaction = () => {
  return (
    <div>
      <div>
        <div className="my-3 mx-3 p-3">
          <h2 style={RedText}>My Transaction</h2>
        </div>
        <div className="ms-4">
          <Card style={{ width: "34rem", backgroundColor: "#1A1A1A" }}>
            <div>
              <Card.Body className="d-flex">
                <div>
                  <Image
                    src={ViperMini}
                    style={{
                      width: "90px",
                      height: "145px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div>
                  <div className="my-0 ms-3">
                    <Card.Text style={RedText}>Mouse</Card.Text>
                    <Card.Text style={RedText}>Tanggal</Card.Text>
                    <Card.Text style={{ color: "#FFFFFF" }}>Harga</Card.Text>
                  </div>
                  <div className="ms-3 mt-4">
                    <Card.Text style={{ color: "#FFFFFF" }}>
                      Sub Total
                    </Card.Text>
                  </div>
                </div>
                <div>
                  <Image src={DumbMerchLogo} style={DumbLogo} />
                </div>
              </Card.Body>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

const RedText = {
  color: "red",
};

const DumbLogo = {
  width: "70px",
  marginLeft: "250px",
  marginTop: "40px",
};
export default MyTransaction;
