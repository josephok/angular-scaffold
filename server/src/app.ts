import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { Request, Response, NextFunction } from 'express';

const router = require('./router');

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// 启用cors
app.use(cors());

app.use('/api', router);

// 错误处理
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack);
  res.status(500).send('server error');
});

app.listen(app.get('port'), () => {
  console.log(('  App is running at http://localhost:%d in %s mode'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
