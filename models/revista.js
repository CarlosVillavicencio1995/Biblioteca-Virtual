module.exports = function(sequelize, Sequelize) {
  var aux = require('../models/documentoR');
  var DocumentoR = new aux(sequelize, Sequelize);
  var Revista = sequelize.define('revista', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    issn: {
      type: Sequelize.STRING(60)
    },
    local_edicion: {
      type: Sequelize.STRING(60)
    },
    frecuencia_articulos: {
      type: Sequelize.STRING(60)
    },
    url: {
        type: Sequelize.STRING (200)
    },
    external_id: {
      type: Sequelize.UUID
    }
  });

  Revista.belongsTo(DocumentoR, {
    foreignKey: 'id_documentoR',
    constraints: false
  });
  return Revista;

};
