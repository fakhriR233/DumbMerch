import React from "react";
import Header from "../components/Header";
import DetailDescCompare from "../components/ProductCompareWith/DetailDescCompare";
import DetailImageCompare from "../components/ProductCompareWith/DetailImageCompare";
import Card from "react-bootstrap/Card";
import CompareWith from "../components/ProductCompareWith/CompareWith";
import { useParams } from "react-router-dom";

function CompareProductScreen() {

  const params = useParams()

  const indx = params.id

  return (
    <div>
      <Header />
      <h1 className="mb-5" style={{ color: "white", textAlign: "center" }}>
        Product Comparison
      </h1>
      <div className="d-flex justify-content-md-center">
        <div className="p-3 mx-3 mt-3">
          <div style={Styles.CardSize}>
            <Card className="bg-dark p-3" style={{ height: "100%" }}>
              <DetailImageCompare />
              <DetailDescCompare />
            </Card>
          </div>
        </div>

        <div className="p-3 mx-3 mt-3">
          <div style={Styles.CardSize}>
            <Card className="bg-dark p-3" style={{ height: "100%" }}>
              <DetailImageCompare />
              <CompareWith />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

const Styles = {
  CardSize: {
    width: "480px",
  },
};

export default CompareProductScreen;
