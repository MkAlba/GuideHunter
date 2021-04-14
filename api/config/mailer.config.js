const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const cron = require('node-cron');

const User = require('../models/user.model');
const Guide = require('../models/guide.model');
const moment = require('moment');

var crypto = require('crypto');




const appUrl = process.env.APP_URL;
const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASSWORD;

const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user,
    pass,
  },
});


module.exports.sendQuestionMail = (email, client, subject, day, hour, duration, service, business) => {

  console.log('enviant mail confirmacio ---------------------------')
  console.log(email)
  transport
    .sendMail({
      to: email,
      from: `Cita Previa Validation<${user}>`,
      subject: subject,
      html: `
					<h1>Hi ${client}</h1>
					<p>Here we send you your booking confirmation:</p>
          <h3>${business}</h3>
          <h3>Service</h3> <span>${service} </span>
          <h3>Day</h3> <span>${day} </span>
          <h3>Hour</h3> <span>${hour} </span>
          <h3>Duration</h3> <span>${duration} </span>      
				`,
      // alternatives: [{
      //   contentType: "text/calendar",
      //   content: new Buffer(ical)
      // }]
    })

    .then(() => { })
    .catch(console.error);
};



/*cron.schedule(' * * * * *', async (slots) => {

  todayDate = moment().format('YYYY-MM-DD')
  const dueDate = moment().add(1, 'days').format('YYYY-MM-DD')

  try {
    const slots = await Slots.find({
      booked: true
    }).populate('client').populate('service')
    for (let i = 0; i < slots.length; i++) {

      if (dueDate === slots[i].day) {
        serviceId = slots[i].service
        userId = slots[i].client
        mailSlot = slots[i].client.email
        transport
          .sendMail({
            to: slots[i].client.email,
            from: `Confirmation<${slots[i].service.service_slogan}>`,
            subject: slots[i].service.service_slogan,
            html: `
          <h1>Hi ${slots[i].client_name}</h1>
          <p>
          This email is just to remind you that you have an appointment tomorrow ${slots[i].day} at ${slots[i].time}...
          If you have any problems, please contact us to cancel, so we can serve another client !!</p>
          <a style="padding: 10px 20px; color: white; background-color: pink; border-radius: 5px;">Click here</a>
        `,
          })
          .catch(error => console.log(error))
      }
    }
  } catch (err) {
    console.log(err);
  }
});*/




/*
module.exports.sendForgotMail = (token, email) => {

  console.log('trasnport:', token);

  console.log('mail:', email);

  transport
    .sendMail({
      to: email,
      from: `Cita Previa Reset<${user}>`,
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account
        Please click on the following link, or paste this into your browser to complete the process

        <a href=${appUrl}/reset?token=${token} style="padding: 10px 20px; color: white; background-color: pink; border-radius: 5px;">Click here</a>`
          })

    .then(() => {
      console.log('Forgot email sent');
    })
    .catch(console.error);

}


module.exports.newPassword = (email) => {
  console.log('neww password:', user);
  console.log('mail:', email);
  transport
    .sendMail({
      to: email,
      from: `Cita Previa NewPassword<${user}>`,
      subject: 'Password Changed',
      text: `This is a confirmation that the password for your account`
          })
    .then(() => {
      console.log('Forgot email sent');
    })
    .catch(console.error);
  }*/