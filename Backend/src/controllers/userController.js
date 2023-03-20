const {userModel, accountModel} = require("../database/models");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const {verifyToken,secretkey} = require ("../services/tokenService");
const useLogFile = require ('../services/errorLog');

const getLogin = async (req, res) => {
  try {
    const user = await userModel.findOne({
      attributes: ["email", "password","idRole"],
      where: {
        email: req.params.email,
      },
    });
    const match = await bcrypt.compare(req.params.password, user.password);
    if (match) {
      jwt.sign({ user: user }, secretkey, (err, token) => {
        res.status(200).json(token);
      });
    } else {
      res.status(200).json("Denied");
    }
  } catch (err) {
    useLogFile(500,err,new Date());
    res.status(500).json(err);
  }
};

const getAllUsers = async (req, res) => {
  console.log(req.headers["authorization"]);
  verifyToken(req, res, async () => {
    try {
      const users = await userModel.findAll({
        attributes: ["idUser","name", "englishLevel", "knowledge", "idRole", "email","cvUrl"],
      });
      users.length === 0
        ? res.status(404).json("No data available")
        : res.status(200).json(users);
    } catch (err) {
      useLogFile(500,err,new Date());
      res.status(500).json(err);
    }
  });
};

const getOneUser = async (req, res) => {
  verifyToken(req, res, async () => {
    try {
      const user = await userModel.findOne({
        attributes: ["idUser","name", "englishLevel", "knowledge", "idRole", "email","cvUrl"],
        where: {
          email: req.params.email,
        },
      });
      user === null
        ? res.status(404).json("No data available")
        : res.status(200).json(user);
    } catch (err) {
      useLogFile(500,err,new Date());
      res.status(500).json(err);
    }
  });
};
  
  const createNewUser = async (req, res) => {
    const data = req.body;
    console.log("qwerty");
    const hash = await bcrypt.hash(data.password, saltRounds);
    verifyToken(req, res, async () => {
      try {
        //Validate user non-existent
        const user = await userModel.findOne({
          attributes: ["idUser","email"],
          where: {
            email: data.email,
          }
        })
        if (user === null){ 
          await userModel.create({
            name: data.name,
            englishLevel: data.englishLevel,
            knowledge: data.knowledge,
            idRole: data.idRole,
            email: data.email,
            password: hash,
            cvUrl: data.cvUrl
          });
          res.status(201).json(data);
        }else{
          res.status(201).json("Existing user");
        }

        
      } catch (err) {
        useLogFile(500,err,new Date());
        res.status(500).json(err);
      }
    });
  };
  
  const updateOneUser = async (req, res) => {
    const data = req.body;
    const hash = await bcrypt.hash(data.password, saltRounds);
    verifyToken(req, res, async () => {
      try {
        await userModel.update(
          {
            name: data.name,
            englishLevel: data.englishLevel,
            knowledge: data.knowledge,
            idRole: data.idRole,
            email: data.email,
            cvUrl: data.cvUrl
          },
          {
            where: {
              idUser: req.params.idUser,
            },
          }
        );
        res.status(200).json(data);
      } catch (err) {
        useLogFile(500,err,new Date());
        res.status(500).json(err);
      }
    });
  };
  
  const deleteOneUser = async (req, res) => {
    verifyToken(req, res, async () => {
      try {
        await userModel.destroy({
          where: {
            idUser: req.params.idUser,
          },
        });
        res.status(200).json("Record deleted");
      } catch (err) {
        useLogFile(500,err,new Date());
        res.status(500).json(err);
      }
    });
  };

  
  module.exports = {
    getLogin,
    getAllUsers,
    getOneUser,
    createNewUser,
    updateOneUser,
    deleteOneUser,
  };