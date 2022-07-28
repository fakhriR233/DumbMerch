const { category } = require("../../models");

exports.addCategory = async (req, res) => {
  try {
    await category.create(req.body);

    res.status(200).send({
      status: "Success",
      message: "New category successfully Added!",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "Failed",
      message: "Server error, can't add new Category",
    });
  }
};

exports.getCategory = async (req, res) => {
  try {
    let data = await category.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.status(200).send({
      status: "Success",
      message: "Showing all Categories",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "Failed",
      message: "Server error, can't show all Categories",
    });
  }
};

exports.showCategory = async (req, res) => {
  try {
    const { id } = req.params;

    let showCategory = await category.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    showCategory = JSON.parse(JSON.stringify(showCategory));

    res.send({
      status: "Success",
      message: `Showing Category Detail with id : ${id}`,
      data: {
        category: showCategory,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Failed!",
      message: `Server Error, Failed to show user with id : ${id}`,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await category.update(req.body, {
      where: { id },
    });

    res.send({
      status: "Success",
      message: `Updating category success`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Failed!",
      message: `Server Error, Failed to update category`,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await category.destroy({
      where: { id },
    });

    res.status(200).send({
      status: "Success",
      message: `Category has been Deleted`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "Failed!",
      message: `Server Error, Failed to delete Category `,
    });
  }
};
