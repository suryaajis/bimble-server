const { Category } = require("../../models");

class CategoryController {
	static async findAllCategories(req, res, next) {
		try {
			const categories = await Category.findAll();
			res.status(200).json(categories);
		} catch (err) {
			next(err);
		}
	}
	static async createCategory(req, res, next) {
		try {
			const { name } = req.body;
			const createdCategory = await Category.create({ name });
			res.status(200).json(createdCategory);
		} catch (err) {
			next(err);
		}
	}
	static async patchCategory(req, res, next) {
		try {
			const { id } = req.params;
			const { name } = req.body;
			const patchedCategory = await Category.update({ name }, { where: { id } });
			res.status(200).json(patchedCategory);
		} catch (err) {
			next(err);
		}
	}
	static async deleteCategory(req, res, next) {
		try {
			const { categoryId } = req.params;
			const foundCategory = await Category.findByPk(categoryId);
			if (foundCategory) {
				const deletedCategory = await Category.destroy({
					where: {
						id: categoryId,
					},
				});
				res.status(200).json(deletedCategory);
			} else {
				throw { name: "Category not found" };
			}
		} catch (err) {
			next(err);
		}
	}
}

module.exports = CategoryController;
