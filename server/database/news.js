const { DataTypes } = require('sequelize');
const sequelize = require('../bin/database');

const News = sequelize.define('hotelview_news', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  button_text: {
    type: DataTypes.STRING,
  },
  button_type: {
    type: DataTypes.STRING,
  },
  button_link: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: false,
});

module.exports = News;
