import "./App.css";
import LoginScreen from "./screen/LoginScreen";
import RegisterScreen from "./screen/RegisterScreen";
import HomeScreen from "./screen/HomeScreen";
import Header from "./components/Header";
import ComplainScreen from "./screen/ComplainScreen";
import "bootstrap/dist/css/bootstrap.min.css";
import MyProfileScreen from "./screen/MyProfileScreen";
import DetailProductScreen from "./screen/DetailProductScreen";
import ListCategoryScreen from "./screen/adminScreen/ListCategoryScreen";
import ProductListScreen from "./screen/adminScreen/ProductListScreen";
import EditCategoryScreen from "./screen/adminScreen/EditCategoryScreen";
import EditProductScreen from "./screen/adminScreen/EditProductScreen";
import CompareProductScreen from "./screen/CompareProductScreen";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [user, setUser] = useState("false")

  return (
    <Router>
        <div className="Body">
        <Routes>
          <Route exact="/" path="/" element={<LoginScreen isAdmin={user}/>}/>
          <Route path="/Register" element={<RegisterScreen handleRegister={user}/>}/>
          <Route exact path="/ListCategory" element={<ListCategoryScreen/>}/>
          <Route exact path="/ListProduct" element={<ProductListScreen/>}/>
          <Route exact path="/EditCategory" element={<EditCategoryScreen/>}/>
          <Route exact path="/EditProduct" element={<EditProductScreen/>}/>
          <Route path="/HomeScreen" element={<HomeScreen />}/>
          <Route path="/ProfileScreen" element={<MyProfileScreen />}/>
          <Route path="/Complain" element={<ComplainScreen isAdmin={user}/>}/>
          <Route path="/CompareProduct" element={<CompareProductScreen />}/>
          <Route path="/DetailProduct/:id" element={<DetailProductScreen />}/>

        </Routes>
      </div>
    </Router>

 
      

  );
}

export default App;
