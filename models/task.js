'use strict';
const { Model } = require('sequelize');
const { underscoredIf } = require('sequelize/lib/utils');

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate (models) {
      Task.belongsTo(models.User, {
        foreignKey: {
          name: 'userId',
        },
      });
    }
  }
  Task.init(
    {
      body: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          not: /^$/,
        },
      },
      deadline: {
        type: DataTypes.DATEONLY,
        validate: {
          isAfter: new Date(
            new Date().setDate(new Date().getDate() - 1)
          ).toISOString(),
        },
      },
    },
    {
      sequelize,
      underscored: true,
      modelName: 'Task',
    }
  );
  return Task;
};
