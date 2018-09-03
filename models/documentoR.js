module.exports = function(sequelize, Sequelize) {
  var aux = require('../models/tematica');
  var tematica = new aux(sequelize, Sequelize);
  var DocumentoR = sequelize.define('documentoR', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    imagen: {
      type: Sequelize.STRING(200)
    },
    titulo: {
      type: Sequelize.STRING(60)
    },
    fecha_edicion: {
      type: Sequelize.STRING(60)
    },
    num_pag: {
      type: Sequelize.INTEGER
    },
    idioma: {
      type: Sequelize.STRING(60)
    },
    external_id: {
      type: Sequelize.UUID
    }
  });
  DocumentoR.associate = function(models) {
    models.documentoR.hasMany(models.historial, {
      foreignKey: 'id_documentoR'
    });

    models.documentoR.hasMany(models.revista, {
      foreignKey: 'id_documentoR'
    });
  };

  DocumentoR.belongsTo(tematica, {
    foreignKey: 'id',
    constraints: false
  });
  return DocumentoR;
};
