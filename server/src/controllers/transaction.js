const { transactions, products, Users } = require("../../models");
const jwt = require("jsonwebtoken");

exports.getTransactions = async (req, res) => {
  try {
    const idBuyer = req.Users.id;
    let dataTransaction = await transactions.findAll({
      where: {
        idBuyer,
      },
      include: [
        {
          model: products,
          as: "products",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Users,
          as: "buyer",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
        {
          model: Users,
          as: "seller",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "idBuyer", "idSeller", "idProduct"],
      },
    });

    dataTransaction = JSON.parse(JSON.stringify(dataTransaction));

    dataTransaction = dataTransaction.map((item) => {
      return {
        ...item,
        product: {
          ...item.product,
          image: process.env.PATH_FILE + item.products.image,
        },
      };
    });

    res.status(200).send({
      status: "Success",
      message: "Showing all Transactions",
      dataTransaction,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "Failed",
      message: "Server Error, failed to show all Transactions",
    });
  }
};

exports.addTransactions = async (req, res) => {
  try {
    const pricing = await products.findOne({
      where: {
        id: req.body.idProduct,
      },
    });

    // if(!pricing.price) {
    //     return res.status(400).send({
    //         status: "error",
    //         message: "Product Doesn't Exist!"
    //     })
    // }

    const buy = await transactions.create({
      idProduct: req.body.idProduct,
      idBuyer: req.Users.id,
      idSeller: req.body.idSeller,
      price: pricing.price,
      status: "success",
    });

    res.status(200).send({
      status: "Success",
      message: "A new Transaction Added!",
      data: {
        transaction: buy,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "Failed",
      message: "Server error, failed to add new Transaction",
    });
  }
};
