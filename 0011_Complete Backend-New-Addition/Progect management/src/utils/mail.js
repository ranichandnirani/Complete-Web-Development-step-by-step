import Mailgen from "mailgen";

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
    forgotPasswordMailgenContent
};