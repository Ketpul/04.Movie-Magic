import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET = "$bpxXLF//NyVoYkfYJgIkdfghjk90zesbqgrvYo7p6qSwiBsRSH/7KRO"

export default {
    register(userData){
        return User.create(userData);
    },
    async login(email, password){
        const user = await User.findOne({ email});
        if(!user) {
            throw new Error('Invalid user or password');
        }

        const isValid = await bcrypt.compare(password, user.password);
        if(!isValid){
             throw new Error('Invalid user or password!');
        }

        const payload = {
            id: user._id,
            email: user.email,
        }
        const token = jwt.sign(payload, SECRET, {expiresIn: '2h' });

        return token
    }

};