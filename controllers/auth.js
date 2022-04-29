const createJWT = require("../helpers/generateJWT");
const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const uploadAWS = require("../helpers/AWS");

module.exports = {
    register: async (req, res) => {
        try {
            let profileImg = '';
            if (req.file) {
                profileImg = await uploadAWS(req.file, 'users');
            }

            const { email, fullname, password } = req.body;
    
            const existMail = await User.findOne({ email });
            if (existMail) {
                return res.status(400).json({
                    msg: 'Ya existe un usuario con ese correo'
                })
            }
        
            const newUser = new User({
                email,
                fullname,
                password,
                profileImg
            });
        
            const salt = bcryptjs.genSaltSync();
            newUser.password = bcryptjs.hashSync(password, salt);
        
            await newUser.save();
                        
            const token = await createJWT(newUser.fullname, newUser.id);
        
            res.status(201).json({
                newUser,
                token
            });
        } catch (error) {
            console.log(error)
            res.status(500).json({
                msg: 'Error del servidor'
            });
        }
    },
    
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
        
            // Verificar que el usuario exista
            const user = await User.findOne({ email });
        
            if (!user) {
                return res.status(404).json({
                    msg: 'No existe un usuario con ese Correo'
                });
            }
        
            // Verificar si la contraseña es correcta
            const matchPasswords = bcryptjs.compareSync(password, user.password);
        
            if (!matchPasswords) {
                return res.status(401).json({
                    msg: 'Contraseña incorrecta'
                });
            }
        
            // Generar JWT y enviarlo al cliente
            const token = await createJWT(user.fullname, user.id);
        
        
            res.status(200).json({
                user,
                token
            });
        } catch (error) {
            res.status(500).json({
                msg: 'Error del servidor'
            });
        }
    },
    autoLogin: async (req, res) => {
        try {
            const user = await User.findById(req.user.id);

            if (!user) {
                return res.status(404).json({
                    msg: 'No existe este usuario'
                });
            }

            res.status(200).json({
                user
            });
        } catch (error) {
            res.status(500).json({
                msg: 'Error del servidor'
            });
            console.log(error)
        }
    }
}
