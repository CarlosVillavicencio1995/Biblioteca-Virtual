'use strict'
var models = require('./../models');
var bCrypt = require('bcrypt-nodejs');
const uuidv4 = require('uuid/v4');
class UsuarioControllers {


  borrarUsuario(req, res, next) {
    var Persona = models.persona;
    var Estado = false;

    Persona.destroy({
      where: {
        id: req.body.id
      }
    }).then(function (rowsDelete) {
      res.redirect('/listadoUsuarios');
    })

  }

  cargarUsuarios(req, res, next) {
    var Persona = models.persona;
    var Estado = false;

    Persona.findAll().then(function(cuenta) {
      res.send(cuenta);

    });
  }
  crearNuevo(req, res, next) {
    var Persona = models.persona;
    var Cuenta = models.cuenta;
    var Rol = models.rol;
    var generateHash = function(password) {
      return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
    };
    //verificar si el email no esta registrado
    Cuenta.findOne({
      where: {
        usuario: req.body.email
      }
    }).then(function(cuenta) {
      if (cuenta) {
        res.send({
          message: 'El correo ya esta registrado'
        });

      } else {
        var userPassword = generateHash(req.body.contraseña);
        Rol.findOne({
          where: {
            nombre: 'usuario'
          }
        }).then(function(rol) {
          if (rol) {
            var dataPersona = {
              nombres: req.body.nombres,
              apellidos: req.body.apellidos,
              Telefono: req.body.Telefono,
              Direccion: req.body.Direccion,
              e_mail: req.body.email,
              external_id: uuidv4(),
              id_rol: rol.id
            };

            Persona.create(dataPersona, {
              include: [{
                model: Cuenta
              }]
            }).then(function(newPersona, created) {
              if (!newPersona) {
                res.send({
                  message: 'La persona no se guardò'
                });
              }
              if (newPersona) {
                //return done(null, newPersona);
                var data = {
                  usuario: req.body.email,
                  clave: userPassword,
                  id_persona: newPersona.id
                };

                Cuenta.create(data).then(function(newCuenta, created) {
                  if (!newCuenta) {
                    res.send({
                      message: 'La cuenta no se registro'
                    });
                  }
                  if (newCuenta) {
                    res.redirect('/1');
                  }
                });
              }
            });
          } else {
            res.send({
              message: 'El rol no existe'
            });
          }
        });

      }
    });
  }
}
module.exports = UsuarioControllers;
