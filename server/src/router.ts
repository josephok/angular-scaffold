import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { User, Token } from './models';
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './auth';

const SECRECT = 'secret';

const router = express.Router();

router.get('/', verifyToken, function (req, res, next) {
  res.json({
    id: '1',
    name: 'joe',
    firstName: 'Joseph',
    lastName: 'Wu',
    birthday: new Date(Date.UTC(1987, 10, 1, 0, 0, 0))
  });
});

// 登入，成功则颁发token
router.post('/login', function (req, res, next: NextFunction) {
  const { username, password } = req.body;

  User.findOne({ username: username }, function (err, user) {
    if (err) { return res.status(500).send('Error on the server.'); }
    if (!user) { return res.status(404).send('No user found.'); }
    const passwordIsValid = user.comparePassword(password);
    if (!passwordIsValid) { return res.status(401).send({ username: username, token: null }); }
    const token = jwt.sign({ id: user._id }, SECRECT, {
      expiresIn: 86400 // expires in 24 hours
    });

    // 将token存起来
    Token.create({
      userId: user._id,
      token: token
    }, (err, token) => {
      if (err) { return next(err); }
      return res.json({ username: username, token: token });
    });

  });

});

module.exports = router;
