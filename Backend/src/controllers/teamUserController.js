const {teamUserModel} = require("../database/models");
const {verifyToken,secretkey} = require ("../services/tokenService");
const useLogFile = require ('../services/errorLog');

const getAllTeamUsers = async (req, res) => {
    verifyToken(req, res, async () => {
      try {
        const teamUser = await teamUserModel.findAll({
          attributes: ["idTeamUser","idUser", "idTeam","startDate","endDate"],
        });
        console.log(teamUser);
        teamUser.length === 0
          ? res.status(404).json("No data available")
          : res.status(200).json(teamUser);
      } catch (err) {
        useLogFile(500,err,new Date());
        res.status(500).json(err);
      }
    });
  };

  const getOneTeamUser = async (req, res) => {
    verifyToken(req, res, async () => {
      try {
        const teamUser = await teamUserModel.findOne({
          attributes: ["idTeamUser","idUser", "idTeam","startDate","endDate"],
          where: {
            idTeamUser: req.params.idTeamUser,
          },
        });
        teamUser === null
          ? res.status(404).json("No data available")
          : res.status(200).json(teamUser);
      } catch (err) {
        useLogFile(500,err,new Date());
        res.status(500).json(err);
      }
    });
  };

  const createNewTeamUser = async (req, res) => {
    const data = req.body;
    verifyToken(req, res, async () => {
      try {
          await teamUserModel.create({
            idUser: data.idUser,
            idTeam: data.idTeam,
            startDate: data.startDate,
            endDate: data.endDate
          });
          res.status(201).json(data);
      } catch (err) {
        useLogFile(500,err,new Date());
        res.status(500).json(err);
      }
    });
  };

  const updateOneTeamUser = async (req, res) => {
    const data = req.body;
    verifyToken(req, res, async () => {
      try {
        await teamUserModel.update(
          {
            idUser: data.idUser,
            idTeam: data.idTeam,
            startDate: data.startDate,
            endDate: data.endDate
          },
          {
            where: {
              idTeamUser: req.params.idTeamUser,
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

  const deleteOneTeamUser = async (req, res) => {
    verifyToken(req, res, async () => {
      try {
        await teamUserModel.destroy({
          where: {
            idTeamUser: req.params.idTeamUser,
          }
        });
        res.status(200).json("Record deleted");
      } catch (err) {
        useLogFile(500,err,new Date());
        res.status(500).json(err);

      }
    });
  };


  module.exports = {getAllTeamUsers, getOneTeamUser, createNewTeamUser,updateOneTeamUser,deleteOneTeamUser};