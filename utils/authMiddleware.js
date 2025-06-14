const jwt = require('jsonwebtoken');

exports.verifyToken = async (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, process.env.SECRETKEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: 'Token is not valid' });
      }
      req.user = decoded.user;
      next();
    });
  } else {
    res.sendStatus(403);
  }
};
