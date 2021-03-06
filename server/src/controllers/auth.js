const { Users, profile } = require('../../models');

const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      email: Joi.string().email().min(5).required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);
    //console.log(error)

    if (error) {
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
    }

    const checkUser = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (checkUser) {
      return res.status(400).send({
        status: 'Failed',
        message: 'Email is already registered!',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await Users.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      status: 'user',
    });

    const newProfile = await profile.create({
      idUser: newUser.id,
    });

    //jwt token generate
    // const tokenKey = "supersecretkey"
    const token = jwt.sign({ id: Users.id }, process.env.TOKEN_KEY);

    res.status(201).send({
      status: 'Success',
      message: `Register successful, and new profile with id ${newProfile.idUser} has been created`,
      data: {
        name: newUser.name,
        email: newUser.email,
        profileId: newProfile.idUser,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: 'Failed',
      message: 'Server Error',
    });
  }
};

exports.login = async (req, res) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().min(5).required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
    }

    const checkUser = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!checkUser) {
      return res.status(400).send({
        status: 'Failed',
        message: 'Email is not registered!',
      });
    }

    const passCheck = await bcrypt.compare(
      req.body.password,
      checkUser.password
    );

    // if (checkUser.password === null) {
    //   return res.status(400).send({
    //     status: 'Failed',
    //     message: "User DOesn't Exist!"
    //   })
    // }
    
    if (!passCheck) {
      return res.status(400).send({
        status: 'Failed',
        message: 'Wrong Password',
      });
    }

    //jwt token generate
    // const tokenKey = "supersecretkey"
    const token = jwt.sign(
      { id: checkUser.id },
      process.env.TOKEN_KEY
    );

    res.status(200).send({
      status: 'Success',
      message: 'Logged in successfully',
      data: {
        user: {
          name: checkUser.name,
          email: checkUser.email,
          status: checkUser.status,
          token,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: 'Failed',
      message: 'Server Error',
    });
  }
};

exports.checkAuth = async (req, res) => {
  try {
    const id = req.Users.id;

    const dataUser = await Users.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password'],
      },
    });

    if (!dataUser) {
      return res.status(404).send({
        status: 'failed',
      });
    }

    res.status(200).send({
      status: 'success',
      data: {
        user: {
          id: dataUser.id,
          name: dataUser.name,
          email: dataUser.email,
          status: dataUser.status,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status({
      status: 'failed',
      message: 'Server Error',
    });
  }
};
