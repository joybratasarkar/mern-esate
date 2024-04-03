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
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found!'));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = user._doc;
        res
          .cookie('access_token', token, { httpOnly: true })
          .status(200)
          .json(rest);
      } else {
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        const newUser = new User({
          username:
            req.body.name.split(' ').join('').toLowerCase() +
            Math.random().toString(36).slice(-4),
          email: req.body.email,
          password: hashedPassword,
          avatar: req.body.photo,
        });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = newUser._doc;
        res
          .cookie('access_token', token, { httpOnly: true })
          .status(200)
          .json(rest);
      }
    } catch (error) {
      next(error);
    }
  };
  
function saveCookie()
{
    let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    const { password: pass, ...rest } = validUser._doc;
    res.cookie('access_token', token, { httpOnly: true, expires: expires }).status(200).json(rest)
}