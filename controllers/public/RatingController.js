const { Rating } = require('../../models')

class RatingController {
    static async getRating (req, res, next) {
        try {
            const { courseId } = req.params
            const ratings = await Rating.findAll({
                where: { CourseId: courseId },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            })

            let rating = 0
            ratings.forEach((el) => {
              rating += el.rating
            })

            rating = Number((rating / ratings.length).toFixed(2))

            res.status(200).json(rating)
        } catch (error) {
            next(error)
        }
    }

    static async addRating (req, res, next) {
        try {
            const { id } = req.user
            const { courseId } = req.params
            
            console.log(id, courseId)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = RatingController