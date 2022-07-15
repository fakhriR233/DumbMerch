import React from "react";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";

const CompareWith = () => {
  return (
    <div>
      <div>
        <div>
          <h2 style={Styles.RedText}> Other Mouse</h2>
        </div>
        <div>
          <h5 style={Styles.RedText}> Stock: XXX</h5>
        </div>
        <div>
          <p style={Styles.WhiteText}>The Other Description</p>
        </div>
        <div style={Styles.Button}>
          <div>
            <p style={Styles.RedText} className="text-end my-3">
              Rp. The Other Price
            </p>
          </div>
          <div className="d-flex justify-content-md-end mt-auto">
            <Button variant="danger" className="p-2 w-75">
              Buy This One Instead
            </Button>
            <Link to='/HomeScreen'>
              <Button variant="warning" className="p-2 ms-2">
                Compare to Other
              </Button>
            </Link>
          </div>
        </div>
      </div>
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
};

export default CompareWith;
