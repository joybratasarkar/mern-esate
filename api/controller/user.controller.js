import { errorHandler } from "../utils/error.js"
import User from '../model/user.model.js';

import bcryptjs from 'bcryptjs';

export const test = (req, res) => {
    res.json({
        message: 'Hello world'
    })
}


export const updateUser = async (req, res, next) => {
    console.log('inside');
    if (req.user.id !== req.params.id) return next(errorHandler(401, 'You can only update your own account'))
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);

        }
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar
            }
        }, { new: true }

        ) // Return the new updated user
        const { password, ...rest } = updateUser._doc;

        res.status(200).json(rest);

    } catch (error) {
        console.log(error);
        next(error);

    }
}



export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, 'You can only update your own account'))

    try {
        await User.findByIdAndDelete(req.params.id)
        res.clearCookie('access_token');
        res.status(200).json({ message: 'User has been deleted' })
    }
    catch (error) {
        next(error)
    }

}