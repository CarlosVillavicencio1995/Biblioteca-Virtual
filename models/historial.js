module.exports = function (sequelize, Sequelize) {
    var aux = require('../models/persona');
    var Persona = new aux(sequelize, Sequelize);
    var aux1 = require('../models/documento');
    var Documento = new aux1(sequelize, Sequelize);
    var aux2 = require('../models/documentoR');
    var DocumentoR = new aux2(sequelize, Sequelize);
    var Historial = sequelize.define('historial', {
       id: {
           autoIncrement: true,
           primaryKey: true,
           type: Sequelize.INTEGER
       },
       fecha_revisa: {
           type: Sequelize.STRING (60)
       },
       valoracion: {
           type: Sequelize.STRING (60)
       },
       external_id: {
           type: Sequelize.UUID
       }
    });
    Historial.belongsTo(Persona, {foreignKey: 'id_persona',constraints: false});
    Historial.belongsTo(Documento, {foreignKey: 'id_documento',constraints: false});
    Historial.belongsTo(DocumentoR, {foreignKey: 'id_documentoR',constraints: false});
  return Historial;
};
