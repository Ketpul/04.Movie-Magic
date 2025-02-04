import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET;


export const authMiddleware = (req, res, next) => {
    const token = req.cookies['auth'];

    if (!token) {
       return  next();
    } 

    try {
        const decodedToken = jwt.verify(token, SECRET);

        req.user = decodedToken;
        res.locals.user = decodedToken;

        next();
    } catch (error) {
        res.clearCookie('auth');
        res.redirect('/auth/login');
        
    }

};

export const isAuthorized = (req, res, next) => {
    if(!req.user) {
        return res.redirect('/auth/login');
    }

    next();
}