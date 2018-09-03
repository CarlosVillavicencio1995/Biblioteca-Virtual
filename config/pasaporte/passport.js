var bCrypt = require('bcrypt-nodejs');
const uuidv4 = require('uuid/v4');
module.exports = function (passport, cuenta, persona, rol) {
    var Cuenta = cuenta;//modelo
    var Persona = persona;//modelo
    var Rol = rol;
    var LocalStrategy = require('passport-local').Strategy;
    passport.serializeUser(function (cuenta, done) {
        done(null, cuenta.id);
    });
    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        Cuenta.findOne({where: {id: id}, include: [{model: Persona, include: {model: Rol}}]}).then(function (cuenta) {
            if (cuenta) {
                var userinfo = {
                        id: cuenta.id,
                        id_cuenta: cuenta.external_id,
                        id_persona: cuenta.persona.external_id,
                        nombre: cuenta.persona.apellidos + " " + cuenta.persona.nombres,
                        rol: cuenta.persona.rol.nombre
                    };
                done(null, userinfo);
            } else {
                done(cuenta.errors, null);
            }
        });

    });
    //registro de usuarios por passport
    passport.use('local-signup', new LocalStrategy(
            {
                usernameField: 'email', //lo que esta como name en el input del registro
                passwordField: 'contraseña', //lo que esta como name en el input del registro
                passReqToCallback: true // allows us to pass back the entire request to the callback
            },
            function (req, email, password, done) {
                var generateHash = function (password) {
                    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
                };
                //verificar si el email no esta registrado
                Cuenta.findOne({
                    where: {
                        usuario: email
                    }
                }).then(function (cuenta) {
                    if (cuenta)
                    {
                        return done(null, false, {
                            message: 'El correo ya esta registrado'
                        });

                    } else
                    {
                        var userPassword = generateHash(password);
                        Rol.findOne({
                            where: {nombre: 'usuario'}
                        }).then(function (rol) {
                            if (rol) {
                                var dataPersona =
                                        {
                                            nombres: req.body.nombres,
                                            apellidos: req.body.apellidos,
                                            Telefono: req.body.Telefono,
                                            Direccion: req.body.Direccion,
                                            e_mail: email,
                                            external_id: uuidv4(),
                                            id_rol: rol.id
                                        };

                                Persona.create(dataPersona, {include: [ {model:Cuenta} ]}).then(function (newPersona, created) {
                                    if (!newPersona) {
                                        return done(null, false);
                                    }
                                    if (newPersona) {
                                        //return done(null, newPersona);
                                        var data =
                                                {
                                                    usuario: email,
                                                    clave: userPassword,
                                                    id_persona: newPersona.id
                                                };

                                        Cuenta.create(data).then(function (newCuenta, created) {
                                            if (!newCuenta) {

                                                return done(null, false);

                                            }
                                            if (newCuenta) {
                                            

                                                return done(null, newCuenta);
                                            }
                                        });
                                    }
                                });
                            } else {
                                return done(null, false, {
                                    message: 'El rol no existe'
                                });
                            }
                        });

                    }
                });
            }
    ));
    //inicio de sesion
    passport.use('local-signin', new LocalStrategy(
            {
                usernameField: 'txt_correo',
                passwordField: 'txt_clave',
                passReqToCallback: true // allows us to pass back the entire request to the callback
            },
            function (req, email, password, done) {
                var Cuenta = cuenta;
                var isValidPassword = function (userpass, password) {
                    return bCrypt.compareSync(password, userpass);
                }
                Cuenta.findOne({where: {usuario: email}}).then(function (cuenta) {
                    if (!cuenta) {
                        return done(null, false, {message: 'Correo no existe'});
                    }
                    if (!isValidPassword(cuenta.clave, password)) {
                        return done(null, false, {message: 'Clave incorrecta.'});
                    }

                    var userinfo = cuenta.get();
                    //console.log(userinfo.persona.rol+" xxx ");
                    return done(null, userinfo);

                }).catch(function (err) {
                    console.log("Error:", err);
                    return done(null, false, {message: 'Cuenta erronea'});
                });
            }
    ));
}
