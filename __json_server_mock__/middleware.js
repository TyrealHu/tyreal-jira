module.exports = (req, res, next) => {
  console.log(req.path);
  if (req.method === "POST" && req.path === "/login") {
    if (req.body.username === "tyreal" && req.body.password === "123456") {
      return res.status(200).json({
        user: {
          token: "123",
        },
      });
    } else {
      return res.status(400).json({
        msg: "用户账号或密码错误",
      });
    }
    next();
  }
};
