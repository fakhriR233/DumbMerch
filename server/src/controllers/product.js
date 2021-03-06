const { products, Users, category, productcategory } = require("../../models");

exports.getProduct = async (req, res) => {
  try {
    let data = await products.findAll({
      include: [
        {
          model: Users,
          as: "Users",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
        {
          model: category,
          as: "categories",
          through: {
            model: productcategory,
            as: "bridge",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    data = data.map((item) => {
      return {
        ...item,
        image: process.env.PATH_FILE + item.image,
      };
    });

    res.status(200).send({
      status: "Success",
      message: "Showing all Products",
      data: {
        product: data,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "Failed",
      message: "Server error, can't show all Products",
    });
  }
};

exports.addProduct = async (req, res) => {
  try {
    let { categoryId } = req.body;

    if (categoryId) {
      categoryId = categoryId.split(",");
    }

    const data = {
      name: req.body.name,
      desc: req.body.desc,
      price: req.body.price,
      image: req.file.filename,
      qty: req.body.qty,
      idUser: req.Users.id,
    };

    let newProduct = await products.create(data);

    if (categoryId) {
      const productCategoryData = categoryId.map((item) => {
        return { idProduct: newProduct.id, idCategory: parseInt(item) };
      });

      await productcategory.bulkCreate(productCategoryData);
    }

    let productData = await products.findOne({
      where: {
        id: newProduct.id,
      },
      include: [
        {
          model: Users,
          as: "Users",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
        {
          model: category,
          as: "categories",
          through: {
            model: productcategory,
            as: "bridge",
            attributes: [],
          },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });
    productData = JSON.parse(JSON.stringify(productData));

    res.status(200).send({
      status: "Success",
      message: "Products successfully Added!",
      data: {
        ...productData,
        image: process.env.PATH_FILE + productData.image,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "Failed",
      message: "Server error, can't add new Product",
    });
  }
};

exports.showProduct = async (req, res) => {
  try {
    const { id } = req.params;

    let data = await products.findOne({
      where: { id },
      include: [
        {
          model: Users,
          as: "Users",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
        {
          model: category,
          as: "categories",
          through: {
            model: productcategory,
            as: "bridge",
            attributes: [],
          },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    //console.log(data);

    data = {
      ...data,
      image: process.env.PATH_FILE + data.image,
    };

    res.send({
      status: "Success",
      message: `Showing Product Detail with id`,
      data: {
        product: data,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "Failed!",
      message: `Server Error, Failed to show product with id`,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let { categoryId } = req.body;
    categoryId = await categoryId.split(",");

    const data = {
      name: req?.body?.name,
      desc: req?.body?.desc,
      price: req?.body?.price,
      image: req?.file?.filename,
      qty: req?.body?.qty,
      idUser: req?.Users?.id,
    };

    await productcategory.destroy({
      where: {
        idProduct: id,
      },
    });

    let productCategoryData = [];
    if (categoryId !== 0 && categoryId[0] !== "") {
      productCategoryData = categoryId.map((item) => {
        return { idProduct: parseInt(id), idCategory: parseInt(item) };
      });
    }

    if (productCategoryData.length !== 0) {
      await productcategory.bulkCreate(productCategoryData);
    }

    await products.update(data, {
      where: { id },
    });

    res.status(200).send({
      status: "Success",
      message: `Updating product success`,
      data: {
        id,
        data,
        image: req?.file?.filename,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "Failed!",
      message: `Server Error, Failed to update product`,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await products.destroy({
      where: { id },
    });

    res.status(200).send({
      status: "Success",
      message: `Product with id : ${id} had been Deleted`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "Failed!",
      message: `Server Error, Failed to delete product with id : ${id}`,
    });
  }
};
