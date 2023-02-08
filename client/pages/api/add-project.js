// import Tool from '../../models/Tool';

// export default async function handler(req, res) {
//     //create a new Tool
//     if (req.method === 'POST'){
//         console.log(`Inside handler: ${JSON.stringify(req.body)}`);
//         const tool = new Tool({
//             name: req.body.name,
//             image: req.body.image,
//             website: req.body.website,
//             shortDescription: req.body.shortDescription,
//             longDescription: req.body.longDescription,
//             active: req.body.active,
//             category: req.body.category,
//             rating: req.body.rating
//         });
//         try{
//             const savedTool = await tool.save();
//             res.status(200).json({ success: true, data: savedTool })
//         } catch(err){
//             res.status(500).json({ success: false, message: err.message })
//         }
//     } else {
//         res.status(405).json({ success: false, message: 'Invalid request method' })
//         res.end();
//     }
// }

import Tool from '../../models/Tool';
import { verifyJWT } from '../../utils/utils';

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
            // create a new Tool
            const tool = new Tool({
                name: req.body.name,
                image: req.body.image,
                website: req.body.website,
                shortDescription: req.body.shortDescription,
                longDescription: req.body.longDescription,
                review: req.body.review,
                active: req.body.active,
                category: req.body.category,
                rating: req.body.rating
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
