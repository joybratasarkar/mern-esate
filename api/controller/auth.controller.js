import User from '../model/user.model.js'
import bcryptjs from 'bcryptjs'
import {errorHandler} from '../utils/error.js'
export const signup = async (req, res, next) => {
    if(Object.keys(req.body).length)
    {
    const { username, email, password } = req.body
    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = new User({ username: username, email: email, password: hashedPassword })
   try{
    await newUser.save()
    res.status(201).json('User Create Succesfully')
   }
   catch(error){

    // next(errorHandler(550,'error from the function'))
    res.status(500).json({message:error.message,success:false})

   }
}
else
{
    res.status(500).json({message:'Please fill form',success:false})

}   
};