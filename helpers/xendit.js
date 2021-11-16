const axios = require('axios')
const { UserCourse, Course } = require('../models')

const ovoCharge = async (req, res, next) => {
    try {
        const phoneNumber = req.body.phoneNumber
        const userCourseId = Number(req.body.userCourseId)
        const time = new Date()

        const userCourse = await UserCourse.findOne({
            where: { id: userCourseId },
            include: [{
                model: Course
            }]
        })

        const payload = {
			reference_id: `${req.user.email}-${userCourseId}-${time}`,
			currency: 'IDR',
			amount: userCourse.Course.price,
			checkout_method: 'ONE_TIME_PAYMENT',
			channel_code: 'ID_OVO',
			channel_properties: {
				mobile_number: phoneNumber,
			},
		}

        const axiosInstance = axios.create({
			baseURL: 'https://api.xendit.co/ewallets/charges',
		})

		const response = await axiosInstance({
			method: 'POST',
			url: '/',
			data: payload,
			auth: { username: process.env.XENDIT_API_KEY },
		})

        await UserCourse.update(
            { 
                chargeId: response.data.id,
                referenceId: response.data.reference_id
            },
            { where: { id: userCourseId } }
        )
        
        res.status(200).json(response.data)
    } catch (error) {
        next(error.response)
    }
}

const ovoStatus = async (req, res, next) => {
    try {
        const callbackToken = req.headers['x-callback-token']

        if (callbackToken !== process.env.XENDIT_VERIFICATION_TOKEN) throw { name: 'authError' }

        const chargeId = req.body.data.id
        const referenceId = req.body.data.reference_id.split('-')
        const status = req.body.data.status

        console.log(req.body)

        if (status === 'SUCCEEDED') {
            await UserCourse.update(
                { isPaid: true },
                { where: { id: Number(referenceId[1]) } }
            )
        }

        res.status(200).json({
            message: `UserCourse with id ${referenceId[1]} is paid! ChargeId = ${chargeId}`
        })
    } catch (error) {
        next(error)
    }
}

module.exports = { ovoCharge, ovoStatus }