import jwt from 'jsonwebtoken'
import User from '../Models/userModel.js'


const authMiddleware = {
    verifyUser: async (req,res,next)=>{
        const authorizationHeader = req.headers['authorization'];

        let token  = ""
        if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
          token = authorizationHeader.split(' ')[1];
        } else {
          return res.status(401).json({ error: 'Unauthorized' });
        }
        jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
            if (err) {
                return res.status(400).json({"error":"Token expired"})
            };
            req.user = decoded.user;
            next()
        })
    },
    checkStaff: (req,res,next)=>{
        if (req.user && req.user.staff){
            next()
        }else{
            return res.status(401).json({ error: 'Unauthorized' });
        }
    }
}



export default authMiddleware