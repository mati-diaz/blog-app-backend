const uploadAWS = require("../helpers/AWS");
const Post = require("../models/Post")

module.exports = {
    createPost: async (req, res) => {
        try {
            if (req.file) {
                const postImg = await uploadAWS(req.file, 'posts');
                req.body.postImg = postImg;
            }

            const { id } = req.params;
        
            const post = new Post({
                author: req.user.id,
                blog: id,
                ...req.body
            });
        
            await post.save();
        
            res.status(201).json({
                msg: 'La entrada ha sido creada',
                post
            });
        } catch (error) {
            console.log(error)
            res.status(500).json({
                msg: 'Error del servidor'
            });
        }
    },
    
    getPost: async (req, res) => {
        try {
            const { id } = req.params;
    
            const post = await Post.findById(id);
        
            res.status(200).json({
                post
            });
        } catch (error) {
            res.status(500).json({
                msg: 'Error del servidor'
            });
        }
    },
    
    getPosts: async (req, res) => {
        try {    
            const posts = await Post.find().sort({ createdAt: 'desc' });
        
            res.status(200).json({
                posts
            });
        } catch (error) {
            res.status(500).json({
                msg: 'Error del servidor'
            });
        }
    },

    getPostsByBlog: async (req, res) => {
        try {
            const { id } = req.params;

            const posts = await Post.find({ blog: id }).sort({ createdAt: 'desc' });

            res.status(200).json({
                posts
            });

        } catch (error) {
            res.status(500).json({
                msg: 'Error del servidor'
            });
        }
    },
    
    updatePost: async (req, res) => {
        try {
            let postImg = '';
            if (req.file) {
                postImg = await uploadAWS(req.file, 'posts');
                req.body.postImg = postImg;
            }
            
            const { id } = req.params;
        
            await Post.findByIdAndUpdate(id, { ...req.body });
        
            res.status(200).json({
                msg: 'Entrada actualizada',
                postImg
            });
        } catch (error) {
            res.status(500).json({
                msg: 'Error del servidor'
            });
        }
    },
    
    deletePost: async (req, res) => {
        try {
            const { id } = req.params;
    
            await Post.findByIdAndDelete(id);
        
            res.status(200).json({
                msg: 'Entrada eliminada'
            });
        } catch (error) {
            res.status(500).json({
                msg: 'Error del servidor'
            });
        }
    }
}