import './App.css';
import LoginScreen from './screen/LoginScreen';
import RegisterScreen from './screen/RegisterScreen';
import HomeScreen from './screen/HomeScreen';
import Header from './components/Header';
import ComplainScreen from './screen/ComplainScreen';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyProfileScreen from './screen/MyProfileScreen';
import DetailProductScreen from './screen/DetailProductScreen';
import ListCategoryScreen from './screen/adminScreen/ListCategoryScreen';
import ProductListScreen from './screen/adminScreen/ProductListScreen';
import EditCategoryScreen from './screen/adminScreen/EditCategoryScreen';
import EditProductScreen from './screen/adminScreen/EditProductScreen';
import CompareProductScreen from './screen/CompareProductScreen';
import { useContext, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';

import { API, setAuthToken } from './config/api';
import { UserContext } from './context/userContext';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  let navigate = useNavigate();

  const [user, setUser] = useState('false');

  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    // Redirect Auth
    if (state.isLogin === false) {
      navigate('/');
    } else {
      if (state.user.status === 'admin') {
        navigate('/ListCategory');
      } else if (state.user.status === 'user') {
        navigate('/HomeScreen');
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }

      // Get user data
      let payload = response.data.data.user;
      console.log(payload);
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      <div className="Body">
        <Routes>
          <Route exact="/" path="/" element={<LoginScreen />} />
          <Route path="/Register" element={<RegisterScreen />} />
          <Route
            exact
            path="/ListCategory"
            element={<ListCategoryScreen />}
          />
          <Route
            exact
            path="/ListProduct"
            element={<ProductListScreen />}
          />
          <Route
            exact
            path="/EditCategory"
            element={<EditCategoryScreen />}
          />
          <Route
            exact
            path="/EditProduct"
            element={<EditProductScreen />}
          />
          <Route path="/HomeScreen" element={<HomeScreen />} />
          <Route
            path="/ProfileScreen"
            element={<MyProfileScreen />}
          />
          <Route path="/Complain" element={<ComplainScreen />} />
          <Route
            path="/CompareProduct"
            element={<CompareProductScreen />}
          />
          <Route
            path="/DetailProduct/:id"
            element={<DetailProductScreen />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
