const Blog = require("../models/Blog");
const Post = require("../models/Post");

module.exports = {
    createBlog: async (req, res) => {
        try {
            const { name, description } = req.body;
    
            const blog = new Blog({
                author: req.user.id,
                name,
                description
            });
        
            await blog.save();
        
            res.status(201).json({
                msg: 'El blog ha sido creado',
                blog
            });
        } catch (error) {
            res.status(500).json({
                msg: 'Error del servidor'
            });
        }
    },
    
    getBlogs: async (req, res) => {
        try {
            const blogs = await Blog.find();
    
            res.status(200).json({
                blogs
            });
        } catch (error) {
            res.status(500).json({
                msg: 'Error del servidor'
            });
        }
    },

    getBlog: async (req, res) => {
        try {
            const { id } = req.params

            const blog = await Blog.findById(id).populate('author', '_id fullname profileImg');

            res.status(200).json({
                blog
            });
        } catch (error) {
            console.log(error)
            res.status(500).json({
                msg: 'Error del servidor'
            });
        }
    },

    getOwnBlogs: async (req, res) => {
        try {
            const { id } = req.user;

            const blogs = await Blog.find({ author: id }).sort({ createdAt: 'desc' });

            res.status(200).json({
                blogs
            });
        } catch (error) {
            res.status(500).json({
                msg: 'Error del servidor'
            });
        }
    },
    
    getBlogsByUser: async (req, res) => {
        try {
            const { id } = req.params;

            const blogs = await Blog.find({ author: id }).sort({ createdAt: 'desc' });
    
            res.status(200).json({
                blogs
            })
        } catch (error) {
            res.status(500).json({
                msg: 'Error del servidor'
            });
        }
    },
    
    updateBlog: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, description } = req.body;
        
            await Blog.findByIdAndUpdate(id, { name, description });
        
            res.status(200).json({
                msg: 'Blog actualizado'
            });
        } catch (error) {
            res.status(500).json({
                msg: 'Error del servidor'
            });
        }
    },
    
    deleteBlog: async (req, res) => {
        try {
            const { id } = req.params;
    
            await Post.deleteMany({ blog: id })
            await Blog.findByIdAndDelete(id);
        
            res.status(200).json({
                msg: 'Blog Eliminado'
            });
        } catch (error) {
            console.log(error)
            res.status(500).json({
                msg: 'Error del servidor'
            });
        }
    }
}