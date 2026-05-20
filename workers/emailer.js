const axios = require("axios");

const BREVO_API_URL = process.env.BREVO_API_URL || "https://api.brevo.com/v3/smtp/email";
const BREVO_API_KEY = process.env.BREVO_API_KEY 
const BREVO_SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || process.env.EMAIL_USER || "durgaprasadkanneboina272@gmail.com";
const BREVO_SENDER_NAME = "notify";

async function sendMail(email, keyword) {
  if (!BREVO_API_KEY) {
    console.error("Brevo API configuration missing. Set BREVO_API_KEY.");
    return false;
  }

  const payload = {
    sender: {
      name: BREVO_SENDER_NAME,
      email: BREVO_SENDER_EMAIL,
    },
    to: [
      {
        email,
      },
    ],
    subject: "Keyword found",
    textContent: `Keyword found: ${keyword}`,
    htmlContent: `<p>Keyword found: <strong>${keyword}</strong></p>`,
  };

  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "api-key": BREVO_API_KEY,
  };

  try {
    const response = await axios.post(BREVO_API_URL, payload, { headers });
    console.log("Brevo email sent:", response.data);
    return response.status >= 200 && response.status < 300;
  } catch (error) {
    console.error("Error sending Brevo email:", error.response?.data || error.message);
    return false;
  }
}

module.exports = { sendMail };