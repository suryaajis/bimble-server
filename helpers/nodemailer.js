const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bimbleonline8@gmail.com',
    pass: 'inirahasiakita'
  }
})

function sendEmail (payload) {
    const mailOptions = {
        from: 'bimbleonline8@gmail.com',
        to: payload.email,
        subject: `Trial Send Email`,
        html: `<p>
              ${payload.text} <br/><br/>
              <img src="cid:logo" width="300" height="100"></p>`,
        attachments: [{
          filename: 'BIMBLE.png',
          path: __dirname + '/../data/BIMBLE.png',
          cid: 'logo'
        }]
    }
      
    transporter.sendMail(mailOptions)
}

module.exports = sendEmail