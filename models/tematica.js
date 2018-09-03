module.exports = function(sequelize, Sequelize) {

  var Tematica = sequelize.define('tematica', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    nombre_tematica: {
      type: Sequelize.STRING(60)
    }
  });
  Tematica.associate = function(models) {

    models.documento.hasMany(models.documento, {
      foreignKey: 'id'
    });
    models.documentoR.hasMany(models.documentoR, {
      foreignKey: 'id'
    });

  };

  return Tematica;
};
