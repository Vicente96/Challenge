const {teamModel} = require("../database/models");
const {verifyToken,secretkey} = require ("../services/tokenService");
const useLogFile = require ('../services/errorLog');

const getAllTeams = async (req, res) => {
    verifyToken(req, res, async () => {
      try {
        const teams = await teamModel.findAll({
          attributes: ["idTeam","description", "idAccount"],
        });
        teams.length === 0
          ? res.status(404).json("No data available")
          : res.status(200).json(teams);
      } catch (err) {
        useLogFile(500,err,new Date());
        res.status(500).json(err);
      }
    });
  };

  const getOneTeam = async (req, res) => {
    verifyToken(req, res, async () => {
      try {
        const team = await teamModel.findOne({
          attributes: ["idTeam","description", "idAccount"],
          where: {
            idTeam: req.params.idTeam,
          },
        });
        team === null
          ? res.status(404).json("No data available")
          : res.status(200).json(team);
      } catch (err) {
        useLogFile(500,err,new Date());
        res.status(500).json(err);
      }
    });
  };
  const createNewTeam = async (req, res) => {
    const data = req.body;
    verifyToken(req, res, async () => {
      try {
          await teamModel.create({
            description: data.description,
            idAccount: data.idAccount
          });
          res.status(201).json(data);
      } catch (err) {
        useLogFile(500,err,new Date());
        res.status(500).json(err);
      }
    });
  };

  const updateOneTeam = async (req, res) => {
    const data = req.body;
    verifyToken(req, res, async () => {
      try {
        await teamModel.update(
          {
            description: data.description,
            idAccount: data.idAccount
          },
          {
            where: {
              idTeam: req.params.idTeam,
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

  const deleteOneTeam = async (req, res) => {
    verifyToken(req, res, async () => {
      try {
        await teamModel.destroy({
          where: {
            idTeam: req.params.idTeam,
          }
        });
        res.status(200).json("Record deleted");
      } catch (err) {
        useLogFile(500,err,new Date());
        res.status(500).json(err);
      }
    });
  };

  module.exports = {getAllTeams, getOneTeam, createNewTeam, updateOneTeam, deleteOneTeam};