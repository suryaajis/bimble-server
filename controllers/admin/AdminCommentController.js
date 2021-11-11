const { Comment } = require("../../models");

class CommentController {
	static async deleteComment(req, res, next) {
		try {
			const { commentId } = req.params;
			const foundComment = await Comment.findByPk(commentId);
			if (!foundComment) {
				throw { name: "IdNotFound" };
			} else {
				await Comment.destroy({ where: { id: commentId } });
				res.status(200).json({ message: `Comment has been deleted` });
			}
		} catch (err) {
			next(err);
		}
	}
}

module.exports = CommentController;
