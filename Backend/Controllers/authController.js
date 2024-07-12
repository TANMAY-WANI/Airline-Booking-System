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
            // return res.status(200).json({message:"User created successfully"});
            const jwt_payload = {
                user:{
                    id:user.id 
                }
            }
            jwt.sign(jwt_payload,process.env.JWT_SECRET, {expiresIn:'1h'},(err,token)=>{
                if (err) throw err;
                // return res.status(200).json({token})
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
                    id:user.id 
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
    status: async (req,res)=>{
        const {token} = req.body
        let userId = ""
        jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
            if (err) throw err;

            // const {userId,iat,exp} = decoded
            userId = decoded['user']['id']
        })

        const user = await User.findOne({"_id":userId})
        if (!user){
            return res.status(404).send("Invalid token")
        }

        
        let staff = user.staff
        res.status(200).json({staff})
    }
}

export default authController