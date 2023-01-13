// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { mailOptions, transporter } from "../../utils/nodemailer";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    if (!data.from || !data.project || !data.link) {
      return res.status(400).json({ message: "bad request, missing data" });
    }

    try {
      // console.log(data);
      await transporter.sendMail({
        ...mailOptions,
        subject: "New Link Suggestion",
        text: `New Link Suggestion From: ${data.from}\nProject: ${data.project}\nLink: ${data.link}`,
        html: `<p>New Link Suggestion From: ${data.from}\n Project: ${data.project}\n Link: ${data.link}</p>`,
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

export default handler;
