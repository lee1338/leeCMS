const { DataTypes } = require('sequelize');
const sequelize = require('../bin/database');

const Users = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  real_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mail_verified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  account_created: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  account_day_of_birth: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  last_login: {
    type: DataTypes.DATE,
  },
  last_online: {
    type: DataTypes.DATE,
  },
  motto: {
    type: DataTypes.STRING,
  },
  look: {
    type: DataTypes.STRING,
  },
  gender: {
    type: DataTypes.STRING,
  },
  rank: {
    type: DataTypes.INTEGER,
  },
  credits: {
    type: DataTypes.INTEGER,
  },
  pixels: {
    type: DataTypes.INTEGER,
  },
  points: {
    type: DataTypes.INTEGER,
  },
  online: {
    type: DataTypes.BOOLEAN,
  },
  auth_ticket: {
    type: DataTypes.STRING,
  },
  ip_register: {
    type: DataTypes.STRING,
  },
  ip_current: {
    type: DataTypes.STRING,
  },
  machine_id: {
    type: DataTypes.STRING,
  },
  home_room: {
    type: DataTypes.INTEGER,
  },
  secret_key: {
    type: DataTypes.STRING,
  },
  pincode: {
    type: DataTypes.STRING,
  },
  extra_rank: {
    type: DataTypes.INTEGER,
  },
}, {
  timestamps: false, // This prevents Sequelize from adding createdAt and updatedAt columns
});

module.exports = Users
