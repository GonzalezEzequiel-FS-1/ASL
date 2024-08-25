'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Stars extends Model {
    static associate(models) {
      Stars.belongsTo(models.Galaxies, {
        foreignKey: 'galaxyId',
        as: 'galaxy',
      });

      Stars.belongsToMany(models.Planets, {
        through: "PlanetStars",
        foreignKey: 'starId',
        otherKey: 'planetId',
        as: 'planets',
      });
    }
  }

  Stars.init(
    {
      name: DataTypes.STRING,
      size: DataTypes.INTEGER,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Stars',
    }
  );

  return Stars;
};

