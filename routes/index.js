var express = require('express');
var router = express.Router();
var autentification = require('../controllers/AutentificacionControllers');
var authController = new autentification();
var UsuarioContro = require('../controllers/UsuarioControllers');
var UsuarioControllers = new UsuarioContro();
var LibroContro = require('../controllers/LibroControllers');
var LibroControllers = new LibroContro();
var RevistaContro = require('../controllers/RevistaControllers');
var RevistaControllers = new RevistaContro();
var passport = require('passport');
/* GET home page. */
//login
router.get('/', authController.signin);
router.post('/login', passport.authenticate('local-signin', {
  successRedirect: '/1',
  failureRedirect: '/'
}));

router.get('/cerrar', authController.logout);

//rutas para cargarDatos
router.get('/app/activos', UsuarioControllers.cargarUsuarios);
router.get('/app/libros', LibroControllers.cargarLibros);
router.get('/app/revistas', RevistaControllers.cargarRevistas);
//rutas para craarDatos
router.post('/app/crearNuevo', UsuarioControllers.crearNuevo);
router.post('/app/crearLibro', LibroControllers.crearLibro);
router.post('/app/crearRevistas', RevistaControllers.crearRevista);
//rutas para eliminarDatos
router.post('/app/borrarUsuario', UsuarioControllers.borrarUsuario);
router.post('/app/borrarRevista', RevistaControllers.borrarRevista);
router.post('/app/borrarLibro', LibroControllers.borrarLibro);
//registro
router.get('/registro', authController.signup);
router.post('/registro/save', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/registro'
}));


router.get('/2', function(req, res, next) {
  res.render('registrar', {})
});
router.get('/1', function(req, res, next) {
  console.log("lkhk");
  res.render('plantilla', {
    usuario : req.user.nombre,
    title: 'Inicio',
    archivo: "./dinamicos/home",
    pagina: "Inicio",
    descripcion: "Bienvenidos a la Biblioteca Virtual",
    rol: req.user.rol
  });
});
// rutas de registro
router.get('/registroAdmin', function(req, res, next) {
  res.render('plantilla', {
    usuario : req.user.nombre,
    title: 'Registro',
    archivo: "./dinamicos/registroAdmin",
    pagina: "Registrar Admin",
    descripcion: "Por favor ingrese sus datos del nuevo Administrador",
    rol: req.user.rol
  });
});
router.get('/registroUsuario', function(req, res, next) {
  res.render('plantilla', {
    usuario : req.user.nombre,
    title: 'Registro',
    archivo: "./dinamicos/registroUsuario",
    pagina: "Registrar Usuario",
    descripcion: "Por favor ingrese sus datos del nuevo Usuario",
    rol: req.user.rol
  });
});
router.get('/registroLibro', function(req, res, next) {
  res.render('plantilla', {
    usuario : req.user.nombre,
    title: 'Registro',
    archivo: "./dinamicos/registroLibro",
    pagina: "Registrar Libro",
    descripcion: "Por favor ingrese los datos del Libro que desea ingresar",
    rol: req.user.rol
  });
});

router.get('/registroRevista', function(req, res, next) {
  res.render('plantilla', {
    usuario : req.user.nombre,
    title: 'Registro',
    archivo: "./dinamicos/registroRevista",
    pagina: "Registrar Revista",
    descripcion: "Por favor ingrese los datos de la Revista que desea ingresar",
    rol: req.user.rol
  });
});
router.get('/registroCategoria', function(req, res, next) {
  res.render('plantilla', {
    usuario : req.user.nombre,
    title: 'Registro',
    archivo: "./dinamicos/registroCategoria",
    pagina: "Registrar Categoria",
    descripcion: "Por favor ingrese la nueva Categoria",
    rol: req.user.rol
  });
});
//rutas de listado
router.get('/listadoAdministradores', function(req, res, next) {
  res.render('plantilla', {
    usuario : req.user.nombre,
    title: 'Listado',
    archivo: "./dinamicos/listadoAdministradores",
    pagina: "Listado de Administradores",
    descripcion: "Estos son todos los Adminitradores de nuestra Biblioteca Virtual",
    rol: req.user.rol
  });
});
router.get('/listadoUsuarios', function(req, res, next) {
  res.render('plantilla', {
    usuario: req.user.nombre,
    title: 'Listado',
    archivo: "./dinamicos/listadoUsuarios",
    pagina: "Listado de Usuarios",
    descripcion: "Estos son todos los Adminitradores de nuestra Biblioteca Virtual",
    rol: req.user.rol
  });
});

router.get('/listadoLibros', function(req, res, next) {
  res.render('plantilla', {
    usuario : req.user.nombre,
    title: 'Listado',
    archivo: "./dinamicos/listadoLibros",
    pagina: "Listado de Libros",
    descripcion: "Estos son todos los Libros de los que dispone nuestra Biblioteca Virtual",
    rol: req.user.rol
  });
});
router.get('/listadoRevistas', function(req, res, next) {
  res.render('plantilla', {
    usuario : req.user.nombre,
    title: 'Listado',
    archivo: "./dinamicos/listadoRevistas",
    pagina: "Listado de Revistas",
    descripcion: "Estos son todas las Revistas de las que dispone nuestra Biblioteca Virtual",
    rol: req.user.rol
  });
});
// rutas crud


module.exports = router;
