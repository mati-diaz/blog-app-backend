const uploadAWS = require("../helpers/AWS");
const Blog = require("../models/Blog");
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const User = require("../models/User");

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find();
    
            res.status(200).json({
                users
            });
        } catch (error) {
            res.status(500).json({
                msg: 'Error del servidor'
            });
        }
    },

    getUser: async (req, res) => {
        try {
            const { id } = req.params;

            const user = await User.findById(id);

            res.status(200).json({
                user
            });
        } catch (error) {
            res.status(500).json({
                msg: 'Error del servidor'
            });
        }
    },
    
    updateUser: async (req, res) => {
        try {
            if (req.file) {
                const profileImg = await uploadAWS(req.file, 'users');
                req.body.profileImg = profileImg
            }
        
            const id = req.user.id;
                
            await User.findByIdAndUpdate(id, req.body);
        
            const user = await User.findById(id, 'id fullname description profileImg configDone');
        
            res.status(200).json({
                msg: 'Usuario actualizado',
                user,
            });
        } catch (error) {
            res.status(500).json({
                msg: 'Error del servidor'
            });
        }
    },
    
    deleteUser: async (req, res) => {
        try {
            const { id } = req.user;
    
            // Eliminar blogs
            await Blog.deleteMany({ author: id });
        
            // Eliminar entradas
            await Post.deleteMany({ author: id });
        
            // Eliminar comentarios
            await Comment.deleteMany({ author: id });
        
            // Eliminar usuario
            await User.findByIdAndDelete(id);
        
            res.json({
                ok: true,
                msg: 'Usuario Eliminado'
            });
        } catch (error) {
            res.status(500).json({
                msg: 'Error del servidor'
            });
        }
    }
}