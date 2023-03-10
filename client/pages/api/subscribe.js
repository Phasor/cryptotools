const mailchimp = require("@mailchimp/mailchimp_marketing");
import allowCors from "../../utils/allowCors";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER,
});

async function handler(req, res) {
  const { email } = req.body;
  // console.log(`email: ${email}`);
  try {
    const response = await mailchimp.lists.addListMember(
      `${process.env.MAILCHIMP_LIST_ID}`,
      {
        email_address: email,
        status: "subscribed",
      }
    );
    console.log(response);
    res.status(200).json({ success: true, message: "Subscriber added!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
}

export const config = {
  method: "POST",
};

// wrap the handler function with the allowCors function
export default allowCors(handler);
