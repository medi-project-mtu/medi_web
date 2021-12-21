import emailjs from "emailjs-com";

const userId = "user_kqgi9xhANyXmtsnomdpt2";
const templateId = "template_t22qko5";
const serviceId = "service_zky06v8";

const sendEmail = (params) => {
    emailjs.send(serviceId, templateId, params, userId).then(
        (result) => {
            alert(`Email sent successfuly! (code = ${result.text})`);
        },
        (error) => {
            alert(`Error sending email. (code = ${error.text})`);
        }
    );
};

export { sendEmail };
