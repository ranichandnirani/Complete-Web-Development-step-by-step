import Mailgen from "mailgen";
import nodemailer from "nodemailer";

// Preparing the mail
const sendEmail = async (options) => {
    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Task Manager",
            link: "https://mail.js"
        }
    });

    const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);

    const emailHtml = mailGenerator.generate(options.mailgenContent);

    // Transporter Object

    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS,
        }
    });

    // Mail Object
    const mail = {
        from: "mail.taskmanager@example.com",
        to: options.email,
        subject: emailTextual,
        html: emailHtml
    }

    try {
        await transporter.sendMail(mail);
    } catch(error) {
        console.error("Email service failed siliently. Make sure that you have provided our MAILTRAP credentials in the .env file.");

        console.error("Error: ", error);
    }
};

// Generate mails

const emailVerificationMailgenContent = (username, verificationUrl) => {
    return {
        body: {
            name: username,
            intro: "Welcome to our App! we'are excited to have you on board.",
            action: {
                instructions: "To verify your email please click on the following button",
                button: {
                    color: "#1aae5af",
                    text: "Verify your email",
                    link:  verificationUrl,

                },
            },
            outro: "Need help, or have questions? Just reply to this email, we'd love to help ou.",
        },
    };
};

// for forgot password
const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
    return {
        body: {
            name: username,
            intro: "We got request to reset the password of your account",

            action: {
                instructions: "To reset our password click on the following button or link",
                button: {
                    color: "#22BC66",
                    text: "reset password",
                    link:  passwordResetUrl,

                },
            },
            outro: "Need help, or have questions? Just reply to this email, we'd love to help ou.",
        },
    };
};

export{
    emailVerificationMailgenContent,
    forgotPasswordMailgenContent,sendEmail
};