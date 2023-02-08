import Tool from '../../models/Tool';
import { verifyJWT } from '../../utils/utils';
const xss = require('xss');

export default async function handler(req, res) {
    // check if they have sent a token
    if (!req.headers.authorization) {
        return res.status(401).json({ success: false, message: 'Unauthorized' })
    }

    if (req.method === 'POST'){
        // verify the token
        const token = req.headers.authorization.split(' ')[1];
        try{
            const decodedToken = await verifyJWT(token);
        } catch(err){
            return res.status(401).json({ success: false, message: 'Unauthorized' })
        }

        try{
            // sanitize and trim the data
            const name = xss(req.body.name.trim());
            const image = xss(req.body.image.trim());
            const website = xss(req.body.website.trim());
            const shortDescription = xss(req.body.shortDescription.trim());
            const longDescription = xss(req.body.longDescription.trim());
            const review = xss(req.body.review.trim());
            const category = xss(req.body.category.trim());
            const rating = xss(req.body.rating.trim());
            const active = xss(req.body.active.trim());

            // create a new Tool
            const tool = new Tool({
                name,
                image,
                website,
                shortDescription,
                longDescription,
                review,
                active,
                category,
                rating
            });
            const savedTool = await tool.save();
            return res.status(200).json({ success: true, data: savedTool })
        } catch(err){
            return res.status(500).json({ success: false, message: 'Server error' })
        }
    } else {
        return res.status(405).json({ success: false, message: 'Invalid request method' })
    }
}