// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { mailOptions, transporter } from "../../utils/nodemailer";

const handler = async (req, res) => {
  if (req.method === "POST") {
    // check if its a human
    const human = await validateHuman(req.body.token);
    if (!human) {
      return res.status(400).json({ message: "bad request, not human" });
    }

    const data = req.body;
    if (!data.from || !data.project || !data.link) {
      return res.status(400).json({ message: "bad request, missing data" });
    }

    try {
      // console.log(data);
      await transporter.sendMail({
        ...mailOptions,
        subject: "Crypto Tools | New Tool Suggestion",
        text: `New Tool Suggestion From: ${data.from}\n Project: ${data.project}\n Link: ${data.link}`,
        html: `<p>New Message From Crypto Tools!</p><br><p>New Tool Suggestion From: ${data.from}</p><p> Project: ${data.project}</p><p> Link: ${data.link}</p>`,
      });
      return res.status(200).json({ success: true });
    } catch (err) {
      // console.log(err);
      return res.status(400).json({ message: `Error caught, ${err.message}` });
    }
  }
  //console.log(req.body);
  return res.status(400).json({ message: "Bad request" });
};

async function validateHuman(token) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
    {
      method: "POST",
    }
  );
  const data = await response.json();
  console.log(`data: ${JSON.stringify(data)}`);
  return data.success;
}

export default handler;
