const {DataTypes} = require('sequelize');
const {sequelize} = require("./conncetion");

const userModel = sequelize.define('Users',{
idUser:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true, allowNull:false},
name: {type:DataTypes.STRING},
englishLevel:{type:DataTypes.STRING},
knowledge: {type:DataTypes.STRING},
idRole:{type:DataTypes.INTEGER},
email: {type:DataTypes.STRING},
password: {type:DataTypes.STRING},
cvUrl:{type:DataTypes.STRING}
});

const teamModel = sequelize.define('Teams',{
    idTeam:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true, allowNull:false},
    description: {type:DataTypes.STRING},
    idAccount:{type:DataTypes.INTEGER}
    });
const accountModel = sequelize.define('Accounts',{
        idAccount:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true, allowNull:false},
        name: {type:DataTypes.STRING},
        clientName: {type:DataTypes.STRING},
        responsableName: {type:DataTypes.STRING}
        });

const teamUserModel = sequelize.define('teamUsers',{
        idTeamUser:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true, allowNull:false},
        idUser:{type:DataTypes.INTEGER},
        idTeam:{type:DataTypes.INTEGER},
        startDate:{type:DataTypes.DATE},
        endDate:{type:DataTypes.DATE}
        });

//sequelize.sync()
module.exports = {userModel,teamModel,accountModel,teamUserModel};
