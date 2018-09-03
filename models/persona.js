module.exports = function (sequelize, Sequelize) {
    var aux = require('../models/rol');
    var Rol = new aux(sequelize, Sequelize);
    var Persona = sequelize.define('persona', {
       id: {
           autoIncrement: true,
           primaryKey: true,
           type: Sequelize.INTEGER
       },
       nombres: {
           type: Sequelize.STRING (60)
       },
       apellidos: {
           type: Sequelize.STRING (60),
           notEmpty: true
       },
       Telefono: {
           type: Sequelize.STRING(60)
       },
       Direccion: {
           type: Sequelize.STRING(60)
       },
       e_mail: {
           type: Sequelize.STRING (60)
       },
       external_id: {
           type: Sequelize.UUID
       }
    });
    Persona.associate = function (models) {

        models.persona.hasOne(models.cuenta, {
            foreignKey: 'id_persona'
        });
        models.persona.hasMany(models.historial, {
            foreignKey: 'id_persona'
        });
    };
    Persona.belongsTo(Rol, {foreignKey: 'id_rol',constraints: false});
    return Persona;
};
