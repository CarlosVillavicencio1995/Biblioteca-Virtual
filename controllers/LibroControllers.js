'use strict'
var models = require('./../models');
var bCrypt = require('bcrypt-nodejs');
const uuidv4 = require('uuid/v4');


class LibroControllers {

  borrarLibro(req, res, next) {
    var Libro = models.libro;
    var Documento = models.documento;
    var Estado = false;

    Documento.destroy({
      where: {
        id: req.body.id
      }
    }).then(function (rowsDelete) {

      Libro.destroy({
        where: {
          id: req.body.id
        }
      }).then(function (rowsDelete) {
          res.redirect('/listadoLibros');
      });


    })

  }

  cargarLibros(req, res, next) {
    var Libro = models.libro;
    var Documento = models.documento;
    var Estado = false;

    Libro.findAll().then(function(cuenta) {

      Documento.findAll().then(function(docs) {
        res.send({
          cuenta,
          docs
        });
      })

    });
  }

  crearLibro(req, res, next) {
    var Documento = models.documento;
    var Libro = models.libro;

    var mi_external_id = uuidv4();

    var dataDocumento = {
      imagen:req.body.imagen,
      titulo: req.body.titulo,
      fecha_edicion: req.body.fecha_edicion,
      num_pag: req.body.num_pag,
      idioma: req.body.idioma,
      external_id: mi_external_id,
    };

    Documento.create(dataDocumento, {
      include: [{
        model: Documento
      }]
    }).then(function(newDocumento, created) {
      console.log("doc creado");

      Documento.findOne({
        where: {
          external_id: mi_external_id
        }
      }).then(function(doc) {

        if (doc) {
          console.log("kjhkjhkjh", doc.id);
          var dataLibro = {
            isbn: req.body.isbn,
            autor: req.body.autor,
            editorial: req.body.editorial,
            url: req.body.url,
            id_documento: doc.id,
            external_id: uuidv4(),
          }

          Libro.create(dataLibro).then(function(newLibro, created) {
            if (!newLibro) {
              console.log("Libro no creado");
            }
            if (newLibro) {
              console.log("Libro creado");
              res.redirect('/1');
            }

          })

        }
      });
    });
  }
};


module.exports = LibroControllers;
