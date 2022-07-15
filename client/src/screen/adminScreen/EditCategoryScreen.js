import React from "react";
import EditCategory from "../../components/adminCategoryProduct/EditCategory";
import AdminHeader from "../../components/AdminHeader";

const EditCategoryScreen = () => {
  return (
    <div>
      <AdminHeader />
      <div>
        <EditCategory />
      </div>
    </div>
  );
};

export default EditCategoryScreen;
