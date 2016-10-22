var jwt = require('jsonwebtoken');
var User = require('./models/user');
var settings = require('./config.js');
var Post = require('./models/post');
var multer = require('multer');
var upload = multer({ dest: './public/uploads/posts' });

var requireAuth = function(req, res, next) {
  var token = req.headers.authorization;
  if (token) {
    jwt.verify(token, settings.secret, function(err, decoded) {
      if(err) {
        if(err.name === 'TokenExpiredError') {
          return res.status(401).json({ error: '认证码失效，请重新登录!' });
        } else {
          return res.status(401).json({ error: '认证失败！'})
        }
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).json({
      error: '请提供认证码！'
    });
  }
}

var generateToken = function(user) {
  return jwt.sign(user, settings.secret, {
    expiresIn: 3000
  });
}

module.exports = function(app) {
  app.post('/auth/signup', function(req, res) {
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.save(function(err) {
      if(err) { return console.log(err); }
      return res.json({
        token: generateToken({name: user.username}),
        user: { name: user.username, admin: user.admin }
      })
    })
  })

  app.post('/auth/login', function(req, res) {
    User.findOne({ username: req.body.username }, function(err, user) {
      if(err) { return console.log(err); }
      if(!user) { return res.status(403).json({error: '用户名不存在！'}) }
      user.comparePassword(req.body.password, function(err, isMatch) {
        if(err) { return console.log(err); }
        if (!isMatch) { return res.status(403).json({error: "密码无效！" }); }
        return res.json({
          token: generateToken({name: user.username}),
          user: { name: user.username, admin: user.admin }
        });
      });
    });
  })

  app.post('/posts', requireAuth, upload.single('post'), function(req, res) {
    var post = new Post();
    post.name = req.body.name;
    post.content = req.body.content;
    if(req.file && req.file.filename) {
      post.cover = req.file.filename;
    }
    post.save(function(err) {
      if (err) return console.log(err);
      res.json({
        post: post,
        message: '文章创建成功了！'
      });
    });
  })

  app.get('/posts', function(req, res) {
    Post.find(function(err, posts) {
      if (err) return console.log(err);
      res.json({
        posts: posts,
        message: '获取所有文章成功了！'
      });
    })
  })

  app.get('/posts/:post_id', function(req, res) {
    Post.findById({_id: req.params.post_id}, function(err, post) {
      if (err) return res.status(500).json({error: err.message});
      res.json({ post: post })
    })
  })

  app.delete('/posts/:post_id', requireAuth, function(req, res) {
    var id = req.params.post_id;
    Post.findById({_id: id}, function(err, post) {
      post.remove(function(err){
        if (err) return res.status(500).json({error: err.message});
        res.json({
          id: id,
          message: '文章已经移除了！'
        });
      });
    });
  })

  app.put('/posts/:post_id', requireAuth, upload.single('post'), function(req, res) {
    Post.findById({_id: req.params.post_id}, function(err, post) {
      if (err) return res.status(500).json({error: err.message});
      post.name = req.body.name;
      post.content = req.body.content;
      if(req.file && req.file.filename) {
        post.cover = req.file.filename;
      }
      post.save(function(err) {
        if (err) return res.status(500).json({error: err.message});
        res.json({
          post: post,
          message: '文章更新成功了！'
        });
      });
    });
  })
}
