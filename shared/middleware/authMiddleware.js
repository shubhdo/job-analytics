const jwtUtil = require('../utils/jwtUtil');

function authMiddleware(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer token format

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const decoded = jwtUtil.verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Token is not valid' });
  }

  req.userId = decoded.userId;  // Attach userId to the request object
  next();
}

module.exports = authMiddleware;
