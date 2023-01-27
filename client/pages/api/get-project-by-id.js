const Tool = require('../../models/Tool');
const mongoose = require('mongoose');

export default async function handler(req, res) {
    if (req.method === "GET"){
        try{
            const project = await Tool.findById(req.query.id);
            res.status(200).json({success: true, data: project});
        }catch(err){
            res.status(500).json({success: false, message: 'Server error'});
        }
    } else {
        res.status(405).json({success: false, message: 'Invalid request method'});
    }
    res.end();
}