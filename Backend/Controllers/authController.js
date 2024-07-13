import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../Models/userModel.js'


const authController = {
    signup: async (req,res)=>{
        const {email,phoneNumber,password} = req.body;
        try{
            let user = await User.findOne({email});
            if (user){
                return res.status(400).json({message:"User already exist"});
            }

            user = new User({
                email,
                phoneNumber,
                password
            })

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            user.save()
            const jwt_payload = {
                user:{
                    id:user.id,
                    staff:user.staff
                }
            }
            jwt.sign(jwt_payload,process.env.JWT_SECRET, {expiresIn:'1h'},(err,token)=>{
                if (err) throw err
                let response  = {
                    'token':token,
                    'staff':user.staff
                }
                return res.status(200).send(response)
                
            });
        }catch (err){
            console.log(err.message);
            return res.status(500).send("Server Error");
        }
    },

    login: async (req,res)=>{
        try {
            const {email,password} = req.body;

            let user = await User.findOne({email})
            if (!user){
                return res.status(400).json({message:"User not found"})
            }
            const match = bcrypt.compare(password,user.password)
            if (!match){
                return res.status(400).json({message:"Incorrect password"})
            }
            const jwt_payload = {
                user:{
                    id:user.id,
                    staff:user.staff
                }
            }
            jwt.sign(jwt_payload,process.env.JWT_SECRET, {expiresIn:'1h'},(err,token)=>{
                if (err) throw err;
                let response  = {
                    'token':token,
                    'staff':user.staff
                }
                return res.status(200).send(response)
            });
            
        }  catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
          }
    },
    status : async (req, res) => {
        const { token } = req.body;
      
        if (!token) {
          return res.status(400).json({ error: 'Token is required' });
        }
      
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          const userId = decoded.user.id;
      
          if (!userId) {
            return res.status(400).json({ error: 'Invalid token' });
          }
      
          const user = await User.findOne({ _id: userId });
      
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
      
          const staff = user.staff;
          res.status(200).json({ staff });
        } catch (err) {
          if (err.name === 'TokenExpiredError') {
            console.log("Token Expired");
            return res.status(403).json({ error: 'Token expired' });
          }
          console.error(err.message);
          res.status(500).json({ error: 'Internal server error' });
        }      

    }
}
    

export default authController;