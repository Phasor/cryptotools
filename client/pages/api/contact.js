// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const handler = (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    if (!data.from || !data.project || !data.link) {
      return res.status(400).json({ message: "Bad request" });
    }
  }
  //console.log(req.body);
  return res.status(400).json({ message: "Bad request" });
};

export default handler;
