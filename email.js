/**
 * How to use nodemailer with gmail: see README file
 */
module.exports = { send }

const { createTransport } = require('nodemailer')

async function send(to, subject, body) {
  const user = process.env.EMAIL_USER
  const pass = process.env.EMAIL_APP_PW
  if (!user && !pass) throw Error('Add EMAIL_USER and EMAIL_APP_PW env variables before sending email')
  const mail = createTransport({ host: 'smtp.gmail.com', port: 465, secure: true, auth: { user, pass },/*logger: true, debug: true*/ })
  const params = { from: user, to, subject }
  body.startsWith('<') ? params.html = body : params.text = body
  await mail.sendMail(params)
}
