import User from '../model/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'
import jwt from 'jsonwebtoken'



export const signup = async (req, res, next) => {
    if (Object.keys(req.body).length) {
        const { username, email, password } = req.body
        const hashedPassword = bcryptjs.hashSync(password, 10)
        const newUser = new User({ username: username, email: email, password: hashedPassword })
        try {
            await newUser.save()
            res.status(201).json('User Create Succesfully')
        }
        catch (error) {

            // next(errorHandler(550,'error from the function'))
            res.status(500).json({ message: error.message, success: false })

        }
    }
    else {
        res.status(500).json({ message: 'Please fill form', success: false })

    }
};


export const signin = async (req, res, next) => {

    const { email, password } = req.body;

    try {
        const validUser = await User.findOne({ email: email })

        if (!validUser)
            return next(errorHandler(404, 'User not found!!'))
        const isValidPass = await bcryptjs.compareSync(password, validUser.password);
        if (!isValidPass)
            return next(errorHandler(403, "Wrong cridential!"));
        let token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        const {password:pass,...rest}=validUser._doc
        ;
        res.cookie('access_token', token, { httpOnly: true, expires: expires }).status(200).json(rest)
    }
    catch (error) {
        next(error);
    }
};