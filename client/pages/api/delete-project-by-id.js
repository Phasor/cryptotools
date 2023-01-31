import Tool from '../../models/Tool';

export default async function handler(req, res) {
    if (req.method === 'POST'){
        const toolId = req.body.id;
        try{
            Tool.findByIdAndDelete(toolId, (err, tool) => {
                if(err){
                    res.status(500).json({ success: false, message: 'Can not find project' })
                }else{
                    res.status(200).json({ success: true, data: tool })
                }
            })
        } catch(err){
            res.status(500).json({ success: false, message: 'Server error' })
        }
    } else {
        res.status(405).json({ success: false, message: 'Invalid request method' })
        res.end();
    }
}