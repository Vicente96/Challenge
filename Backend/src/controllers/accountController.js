const {accountModel} = require("../database/models");
const {verifyToken,secretkey} = require ("../services/tokenService");
const useLogFile = require ('../services/errorLog');

const getAllAccounts = async (req, res) => {
    verifyToken(req, res, async () => {
      try {
        const accounts = await accountModel.findAll({
          attributes: ["idAccount","name", "clientName","responsableName"],
        });
        accounts.length === 0
          ? res.status(404).json("No data available")
          : res.status(200).json(accounts);
      } catch (err) {
        useLogFile(500,err,new Date());
        res.status(500).json(err);
      }
    });
  };

  const getOneAccount = async (req, res) => {
    verifyToken(req, res, async () => {
      try {
        const account = await accountModel.findOne({
          attributes: ["idAccount","name", "clientName","responsableName"],
          where: {
            idAccount: req.params.idAccount,
          },
        });
        account === null
          ? res.status(404).json("No data available")
          : res.status(200).json(account);
      } catch (err) {
        useLogFile(500,err,new Date());
        res.status(500).json(err);
      }
    });
  };

  const createNewAccount = async (req, res) => {
    const data = req.body;
    verifyToken(req, res, async () => {
      try {
          await accountModel.create({
            name: data.name,
            clientName: data.clientName,
            responsableName: data.responsableName
          });
          res.status(201).json(data);
      } catch (err) {
        useLogFile(500,err,new Date());
        res.status(500).json(err);
      }
    });
  };

  const updateOneAccount = async (req, res) => {
    const data = req.body;
    verifyToken(req, res, async () => {
      try {
        await accountModel.update(
          {
            name: data.name,
            clientName: data.clientName,
            responsableName: data.responsableName
          },
          {
            where: {
              idAccount: req.params.idAccount,
            }
          }
        );
        res.status(200).json(data);
      } catch (err) {
        useLogFile(500,err,new Date());
        res.status(500).json(err);
      }
    });
  };
  
  const deleteOneAccount = async (req, res) => {
    verifyToken(req, res, async () => {
      try {
        await accountModel.destroy({
          where: {
            idAccount: req.params.idAccount,
          }
        });
        res.status(200).json("Record deleted");
      } catch (err) {
        useLogFile(500,err,new Date());
        res.status(500).json(err);
      }
    });
  };

  module.exports = {
    getAllAccounts, getOneAccount, createNewAccount, updateOneAccount, deleteOneAccount
  };