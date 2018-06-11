const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    //patikrinti jwt
    // console.log(req.headers);
    try {
    // istraukiam token is req.headers
        const token = req.headers.authorization.split(' ')[1];
        console.log(token);
        if (!token) return res.status(401).send({err: 'no token!'});
        const user = await jwt.verify(token, 'keyboard cat');
        if (!user) return res.status(401).send({err: 'unauthorized'});
        console.log('user verified');
        //jei viskas ok iskvieciam next()
        next()
    } catch (err) {
        res.status(401).send({err: 'Unauthorized login'})
    }
};

module.exports = auth;