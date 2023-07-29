/* eslint-disable no-undef */
const nodemailer = require("nodemailer");

const congratsMailer = async (userName, userEmail, role) => {
  let transporter = nodemailer.createTransport({
    host: process.env.host,
    port: process.env.port,
    service: "gmail",
    secure: true,
    auth: {
      user: process.env.user,
      pass: process.env.pass,
    },
  });

  await transporter.sendMail({
    from: `"iTutor" <${process.env.itutor}>`,
    to: `${userEmail}`,
    subject: "Registration Successful!",
    text: `You have successfully become a member.`,
    html: `
    <section style="font-family: Arial, Helvetica, sans-serif">
      <h2>Congratulations, <b>${userName}</b>! 🎉🎉</h2>
      <p>You are now a verified ${role} of iTutor.</p>
      
      ${
        role === "tutor"
          ? `
         <p> We are glad to have you on board, your profile is now visible to all the students on the platform.</p>
         
         <p> You can visit your dashboard to submit your credentials and the necessary details.</p>`
          : "<p>You can now go on to search for your desired tutors and start your learning journey, instantly.</p>"
      }
      
      <p>We hope you will find here as your second home.</p>
      <p>
        <b>iTutor. We matchmake.</b>
      </p>
    </section>
    `,
  });

  console.log("message sent");
};

module.exports = congratsMailer;
