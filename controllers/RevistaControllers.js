'use strict'
var models = require('./../models');
var bCrypt = require('bcrypt-nodejs');
const uuidv4 = require('uuid/v4');


class RevistaControllers {

  borrarRevista(req, res, next) {
    var DocumentoR = models.documentoR;
    var Revista = models.revista;
    var Estado = false;

    DocumentoR.destroy({
      where: {
        id: req.body.id
      }
    }).then(function (rowsDelete) {

      Revista.destroy({
        where: {
          id: req.body.id
        }
      }).then(function (rowsDelete) {
          res.redirect('/listadoRevistas');
      });


    })

  }

  cargarRevistas(req, res, next) {
    var DocumentoR = models.documentoR;
    var Revista = models.revista;
    var Estado = false;

    Revista.findAll().then(function(revista) {
      DocumentoR.findAll().then(function(docr) {
        res.send({
          revista,
          docr
        });
      })

    });
  }

  crearRevista(req, res, next) {
    var DocumentoR = models.documentoR;
    var Revista = models.revista;

    var mi_external_id = uuidv4();

    var dataDocumentoR = {
      imagen:req.body.imagen,
      titulo: req.body.titulo,
      fecha_edicion: req.body.fecha_edicion,
      num_pag: req.body.num_pag,
      idioma: req.body.idioma,
      external_id: mi_external_id,
    };

    DocumentoR.create(dataDocumentoR, {
      include: [{
        model: DocumentoR
      }]
    }).then(function(newDocumentoR, created) {
      console.log("doc creado");

      DocumentoR.findOne({
        where: {
          external_id: mi_external_id
        }
      }).then(function(doc) {

        if (doc) {
          console.log("kjhkjhkjh", doc.id);
          var dataRevista = {
            issn: req.body.issn,
            local_edicion: req.body.local_edicion,
            frecuencia_articulos: req.body.frecuencia_articulos,
            url: req.body.url,
            id_documentoR: doc.id,
            external_id: uuidv4(),
          }

          Revista.create(dataRevista).then(function(newRevista, created) {
            if (!newRevista) {
              console.log("revista no creada");
            }
            if (newRevista) {
              console.log("revista creada");
              res.redirect('/1');
            }
          })

        }
      });
    });
  }
};


module.exports = RevistaControllers;
