var mydb = require("../models/user.model");

const defaultAccount = {
  username: "ql",
  password: "1",
};

exports.loginQuanly = async (req, res, next) => {
  let msg = "";

  if (req.method == "POST") {
    if (
      req.body.username === defaultAccount.username &&
      req.body.pass === defaultAccount.password
    ) {
      req.session.userlogin = { username: defaultAccount.username };
      return res.redirect("/quanly");
    } else {
      try {
        let obju = await mydb.quanlymd.findOne({ username: req.body.username });
        console.log(obju);

        if (obju != null) {
          if (obju.pass == req.body.pass) {
            req.session.userlogin = obju;
            return res.redirect("/quanly");
          } else {
            msg = "Mật khẩu sai";
          }
        } else {
          msg = "Username " + req.body.username + " không tồn tại";
        }
      } catch (error) {
        msg = error.message;
      }
    }
    console.log(req.body.username, req.body.password)
  }

  res.render("taikhoan/dangnhapQL", { msg: msg });
};

exports.loginNhanvien = async (req, res, next) => {
  let msg = "";

  if (req.method == "POST") {
    try {
      let obju = await mydb.nhanvienmd.findOne({
        usernameNV: req.body.usernameNV,
      });
      console.log(obju);

      if (obju != null) {
        if (obju.passNV == req.body.passNV) {
          req.session.userlogin = obju;
          return res.redirect("/nhanvien");
        } else {
          msg = "Mật khẩu sai";
        }
      } else {
        msg = "Username " + req.body.usernameNV + " không tồn tại";
      }
    } catch (error) {
      msg = error.message;
    }
  }

  res.render("taikhoan/dangnhapNV", { msg: msg });
};
