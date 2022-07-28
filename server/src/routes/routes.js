const express = require("express");
const { register, login, checkAuth } = require("../controllers/auth");
const {
  addCategory,
  getCategory,
  showCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");
const {
  addProduct,
  getProduct,
  showProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");
const { getProfile } = require("../controllers/profile");
const {
  getTransactions,
  addTransactions,
} = require("../controllers/transaction");
const {
  registerUser,
  showAllUsers,
  showUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

const { auth } = require("../middlewares/auth");

const { uploadFile } = require("../middlewares/uploadFile");

const router = express.Router();

router.get("/users", showAllUsers);
router.get("/user/:id", showUser);
router.get("/profile", auth, getProfile);

router.post("/user", registerUser);
router.patch("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

//products
router.get("/products", auth, getProduct);
router.get("/product/:id", auth, showProduct);
router.post("/product", auth, uploadFile("image"), addProduct);
router.patch("/product/:id", auth, uploadFile("image"), updateProduct);
router.delete("/product/:id", auth, deleteProduct);

//transactions
router.get("/transaction", auth, getTransactions);
router.post("/transaction", auth, addTransactions);

//category
router.get("/categories", auth, getCategory);
router.get("/category/:id", auth, showCategory);
router.post("/category", auth, addCategory);
router.patch("/category/:id", auth, updateCategory);
router.delete("/category/:id", auth, deleteCategory);

//register and login, checkAuth
router.post("/register", register);
router.post("/login", login);
router.get("/check-auth", auth, checkAuth);

module.exports = router;
