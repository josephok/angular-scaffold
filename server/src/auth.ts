import { Request, Response, NextFunction } from 'express';

import * as jwt from 'jsonwebtoken';
import { Token } from './models';

const SECRECT = 'secret';

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  let token: string;
  try {
    if (req.headers['authorization']) {
      token = (<string>req.headers['authorization']).split('Bearer ')[1];
    }
  } catch (error) {
    console.error(error);
  }

  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided.' });
  }

  Token.findOne({ token: token }, (err: any, tokenDb: any) => {
    if (err) {
      return next(err);
    }
    if (!tokenDb) {
      // return next(err);
      return res.status(401).send({ message: 'invalid token' });
    }
    jwt.verify(token, SECRECT, function (err: any, decoded: any) {
      if (err) {
        Token.remove({ token: token }, (err) => {
          if (err) { console.error(err); }
        });

        return res.status(401).send({ message: 'invalid token' });
      }
      // if everything good, save to request for use in other routes
      next();
    });
  });
}
// module.exports = verifyToken;
