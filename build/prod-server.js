require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')

var app = express();
var root = config.build.assetsRoot;
var appData = require('../data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings
var apiRoutes = express.Router();
apiRoutes.get('/', function (req, res, next) {//返回index.html
  req.url = '/index.html';
  next();
});
apiRoutes.get('/seller',function(req,res){
  res.json({
    code:0,
    result:seller
  });
});

apiRoutes.get('/goods',function(req,res){
  res.json({
    code:0,
    result:goods
  });
});
apiRoutes.get('/ratings',function(req,res){
  res.json({
    code:0,
    result:ratings
  });
});

app.use('/api',apiRoutes);
app.use(express.static(root));
/*// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))*/

var server = app.listen(9000)

// module.exports = app.listen(9000, function (err) {//监听port端口
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log('Listening at http://localhost:' + port + '\n')
// });
