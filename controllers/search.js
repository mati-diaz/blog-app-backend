const Post = require("../models/Post");

module.exports = {
    searchPosts: async (req, res) => {
        try {
            const { title } = req.query;
    
            const posts = await Post.find(
                { title: { $regex: '.*' + title.trim() + '.*' } }
            );
        
            res.status(200).json({
                posts
            });
        } catch (error) {
            res.status(500).json({
                msg: 'Error del servidor'
            });
        }
    }
}