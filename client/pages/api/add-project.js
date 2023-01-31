import Tool from '../../models/Tool';

export default async function handler(req, res) {
    //create a new Tool
    if (req.method === 'POST'){
        console.log(`Inside handler: ${JSON.stringify(req.body)}`);
        const tool = new Tool({
            name: req.body.name,
            image: req.body.image,
            website: req.body.website,
            shortDescription: req.body.shortDescription,
            longDescription: req.body.longDescription,
            active: req.body.active,
            category: req.body.category,
            rating: req.body.rating
        });
        try{
            const savedTool = await tool.save();
            res.status(200).json({ success: true, data: savedTool })
        } catch(err){
            res.status(500).json({ success: false, message: err.message })
        }
    } else {
        res.status(405).json({ success: false, message: 'Invalid request method' })
        res.end();
    }
}
