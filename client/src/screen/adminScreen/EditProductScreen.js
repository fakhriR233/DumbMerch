import React from "react";
import AdminHeader from "../../components/AdminHeader";
import EditProductList from "../../components/adminProductList/EditProductList";

const EditProductScreen = () => {
  return (
    <div>
      <AdminHeader />
      <div>
        <EditProductList />
      </div>
    </div>
  );
};

export default EditProductScreen;
