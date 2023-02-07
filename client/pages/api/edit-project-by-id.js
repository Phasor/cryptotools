import Tool from '../../models/Tool';

export default async function handler(req, res) {
    if (req.method === 'POST'){
        const toolId = req.body.id;
        try{
            Tool.findByIdAndUpdate(toolId, req.body.formData, { new: true }, (err, tool) => {
                if (err) {
                    res.status(500).json({ success: false, message: 'Server error' })
                } else {
                    res.status(200).json({ success: true, message: 'Tool updated successfully', tool })
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