import * as jwt from 'jsonwebtoken';
import { Token } from './models';

const SECRECT = 'secret';

export function verifyToken(req, res, next) {
  const token = req.headers['Authorization'].split('Bearer ')[1];
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided.' });
  }

  Token.findOne({ token: token }, (err, token) => {
    if (err) {
      return res.status(500).send({ message: 'server error' });
    }
    if (!token) { return res.status(401).send({ message: 'invalid token' }); }
  });

  jwt.verify(token, SECRECT, function (err, decoded) {
    if (err) {
      Token.remove({ token: token }, (err) => {
        if (err) { console.error(err); }
      });

      return res.status(401).send({ auth: false, message: 'invalid token' });
    }
    // if everything good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
}
// module.exports = verifyToken;
