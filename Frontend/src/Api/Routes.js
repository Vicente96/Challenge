const server = "localhost:3000/";

const loginRoute = `${server}api/v1/users/login/`;
const createUserRoute = `${server}api/v1/users/`;
const createAccount = `${server}api/v3/accounts/`;
const getAccounts = `${server}api/v3/accounts/`;
const getUsers = `${server}api/v1/users/`;
const getTeams = `${server}api/v2/teams/`;
const createTeam = `${server}api/v2/teams/`;
const createUserAssigment = `${server}api/v4/teamUser/`;
const getTransactions = `${server}api/v4/teamUser/`;


module.exports = {
  loginRoute,
  createUserRoute,
  createAccount,
  getAccounts,
  createTeam,
  createUserAssigment,
  getUsers,
  getTeams,
  getTransactions
};