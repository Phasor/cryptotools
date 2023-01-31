import { verifyJWT } from "../../utils/utils";

export default async function(req, res){
    try {
      const token = req.headers.authorization.split(" ")[1];
      // console.log(`token: ${token}`);
      const verified = await verifyJWT(token);
      console.log(`verified: ${JSON.stringify(verified)}`);
      if (verified) {
        res.status(200).json({ success: true, user: verified.sub });
      } else {
        res.status(401).json({ success: false, message: "Invalid token" });
      }
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Something went wrong" });
    }
  }