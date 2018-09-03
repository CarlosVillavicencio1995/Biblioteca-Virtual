module.exports = function (sequelize, Sequelize) {
    var aux = require('../models/documento');
    var  Documento = new aux(sequelize, Sequelize);
    var Libro= sequelize.define('libro', {
       id: {
           autoIncrement: true,
           primaryKey: true,
           type: Sequelize.INTEGER
       },
       isbn: {
           type: Sequelize.STRING (60)
       },
       autor: {
           type: Sequelize.STRING (60)
       },
       editorial: {
           type: Sequelize.STRING (60)
       },
       url: {
           type: Sequelize.STRING (200)
       },
       external_id: {
           type: Sequelize.UUID
       }
    });

    Libro.belongsTo(Documento, {
    foreignKey: 'id_documento',
    constraints: false
  });
  return Libro;
};
