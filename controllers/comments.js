const Comment = require("../models/Comment");

module.exports = {
    createComment: async (req, res) => {
        try {
            const { post, description } = req.body;
    
            const newComment = new Comment({
                author: req.user.id,
                post,
                description
            });
        
            await newComment.save();

            const comment = await Comment.findById(newComment._id).populate('author', 'fullname profileImg');
        
            res.status(201).json({
                msg: 'El comentario ha sido creado',
                comment
            });
        } catch (error) {
            res.status(500).json({
                msg: 'Error del servidor'
            });
        }
    },
    
    getComments: async (req, res) => {
        try {
            const id = req.params.post_id;
    
            const comments = await Comment.find({ post: id })
                .populate('author', 'fullname profileImg')
                .sort({ createdAt: 'desc' });
        
            res.status(200).json({
                comments
            });
        } catch (error) {
            res.status(500).json({
                msg: 'Error del servidor'
            });
        }
    },
    
    updateComment: async (req, res) => {
        try {
            const { id } = req.params;
    
            const { description } = req.body;
        
            await Comment.findByIdAndUpdate(id, { description });
        
            res.status(200).json({
                msg: 'Comentario Actualizado'
            });
        } catch (error) {
            res.status(500).json({
                msg: 'Error del servidor'
            });
        }
    },
    
    deleteComment: async (req, res) => {
        try {
            const { id } = req.params;

            const comment = await Comment.findById(id);

            if (comment.author != req.user.id) {
                return res.status(400).json({
                    msg: 'No puedes eliminar este comentario'
                })
            }
    
            await Comment.findByIdAndDelete(id);
        
            res.status(200).json({
                msg: 'Comentario Eliminado'
            });
        } catch (error) {
            res.status(500).json({
                msg: 'Error del servidor'
            });
        }
    }
}