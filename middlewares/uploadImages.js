const FormData = require("form-data");
const axios = require("axios");

const uploadImages = async (req, res, next) => {
	try {
		if (req.files) {
			const files = req.files;
			const parsedFilesForm = files.map((el) => {
				if (el.mimetype !== "video/mp4" || el.size > 25000000) {
					throw {
						name: `InvalidFileFormat`,
					};
				}
				let parsedFile = el.buffer.toString("base64");
				let form = new FormData();

				form.append("file", parsedFile);
				form.append("fileName", el.originalname);
				return form;
			});

			let Videos = [];

			for (const form of parsedFilesForm) {
				const response = await axios.post("https://upload.imagekit.io/api/v1/files/upload", form, {
					headers: form.getHeaders(),
					auth: { username: process.env.IMAGE_KIT_KEY },
					maxContentLength: Infinity,
					maxBodyLength: Infinity,
				});

				const rawVideoName = response.data.name.split('_')
				rawVideoName.pop()
				const videoName = rawVideoName.join(' ')

				const uploadedVideo = { 
					name: videoName,
					videoUrl: response.data.url,
				};
				Videos.push(uploadedVideo);
			}
			req.body.Videos = Videos;
		}
		next();
	} catch (err) {
		next(err);
	}
};

module.exports = uploadImages;
