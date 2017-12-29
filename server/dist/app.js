"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const app = express();
app.set('port', process.env.PORT || 3000);
// 启用cors
app.use(cors());
const router = express.Router();
app.use('/api', router);
router.get('/', function (req, res) {
    res.json({
        id: '1',
        name: 'joe',
        firstName: 'Joseph',
        lastName: 'Wu',
        birthday: new Date(Date.UTC(1987, 10, 1, 0, 0, 0))
    });
});
app.listen(app.get('port'), () => {
    console.log(('  App is running at http://localhost:%d in %s mode'), app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
});
module.exports = app;
//# sourceMappingURL=app.js.map