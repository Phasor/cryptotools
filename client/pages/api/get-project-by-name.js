const Tool = require('../../models/Tool');

export default async function handler(req, res) {
    if (req.method === "GET"){
        try{
            const project = await Tool.find({ name:req.query.name });
            // check if project exists
            if (project.length === 0) {
                return res.status(404).json({success: false, message: 'Project not found'});
            }
            res.status(200).json({success: true, data: project});
        }catch(err){
            res.status(500).json({success: false, message: err.message});
        }
    } else {
        res.status(405).json({success: false, message: 'Invalid request method'});
    }
    res.end();
}