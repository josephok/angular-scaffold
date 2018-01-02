import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { User, Token, UserModel } from './models';
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

  User.findOne({ username: username }, function (err, user: UserModel) {
    if (err) { return res.status(500).send('Error on the server.'); }
    if (!user) { return res.status(404).send({ message: '用户名不存在' }); }
    const passwordIsValid = user.comparePassword(password);
    if (!passwordIsValid) {
      return res.status(401).send({ message: '密码错误' });
    }
    const token = jwt.sign({ id: user._id }, SECRECT, {
      expiresIn: 86400 // expires in 24 hours
    });

    // 将token存起来
    Token.create({
      userId: user._id,
      token: token
    }, (err: any, token: any) => {
      if (err) { return next(err); }
      return res.json({ id: user._id, token: token.token });
    });

  });

});


router.post('/signup', function (req: Request, res: Response, next: NextFunction) {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  if (!req.body.username || !req.body.password) {
    return res.status(400).send({ message: '用户名密码必填' });
  }

  User.findOne({ username: req.body.username }, (err, existingUser) => {
    if (err) { return next(err); }
    if (existingUser) {
      return res.status(409).send({ message: '用户已存在' });
    }
    user.save((err) => {
      if (err) { return next(err); }
      const token = jwt.sign({ id: user._id }, SECRECT, {
        expiresIn: 86400 // expires in 24 hours
      });

      // 将token存起来
      Token.create({
        userId: user._id,
        token: token
      }, (err: any, token: any) => {
        if (err) { return next(err); }
        return res.json({ id: user._id, token: token.token });
      });
    });
  });

});

module.exports = router;
