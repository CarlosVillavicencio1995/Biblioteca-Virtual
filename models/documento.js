module.exports = function(sequelize, Sequelize) {
  var aux = require('../models/tematica');
  var tematica = new aux(sequelize, Sequelize);
  var Documento = sequelize.define('documento', {
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
  Documento.associate = function(models) {
    models.documento.hasMany(models.historial, {
      foreignKey: 'id_documento'
    });
    models.documento.hasMany(models.libro, {
      foreignKey: 'id_documento'
    });
    //models.documento.hasMany(models.revista, {
      //foreignKey: 'id_documento'
    //});
  };

  Documento.belongsTo(tematica, {
    foreignKey: 'id',
    constraints: false
  });
  return Documento;
};
