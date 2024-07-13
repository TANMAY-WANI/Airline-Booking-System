import jwt from 'jsonwebtoken'
import User from '../Models/userModel.js'

const checkStaffStatus = async(req,res,next)=>{
    const authorizationHeader = req.headers['authorization'];

    let token  = ""
    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
      token = authorizationHeader.split(' ')[1];
    } else {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    let staff = false
    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if (err) {
            return res.status(400).json({"error":"Token expired"})
        };
        staff = decoded['user']['staff']
    })

    if (staff){
        next()
    }else{
        return res.status(401).json({ error: 'Unauthorized' });
    }

}


export {checkStaffStatus}