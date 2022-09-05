const User = require("../models/User");

const bcryptjs = require("bcryptjs");
const passport = require("passport");
const { OPEN_READWRITE } = require("sqlite3");

module.exports = class AuthController {
 
  static login(req, res) {
    res.render("auth/login");
  }

  static async loginPost(req, res, next) {
    passport.authenticate("local", {
      successRedirect: "/balance/show",
      failureRedirect: "/login",
      failureFlash: true,
    })(req, res, next);
  }

  static register(req, res) {
    res.render("auth/register");
  }

  static async registerPost(req, res) {
    const { name, email, password, confirmpassword } = req.body;

    if (password != confirmpassword) {
      res
        .status(400)
        .json({ message: "As senhas não conferem, tente novamente !" });
      return;
    }

    if (password.length < 6) {
      res.status(411).json({ message: "Senha muito fraca !" });
      return;
    }

    const checkUser = await User.findOne({ where: { email: email } });

    if (checkUser) {
      res.status(400).json({ message: "O E-mail já está em uso !" });
      return;
    }

    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(password, salt);

    const user = {
      name,
      email,
      password: hashedPassword,
    };

    try {
      const createUser = await User.create(user);

      res.status(200).json({ message: "Cadastro realizado com sucesso !" });
      return;
    } catch (error) {
      console.log(error);
    }
  }

  static async showUser(req, res) {
    try {
      const showUser = await User.findAll();

      const users = showUser.map((result) => result.get({ plain: true }));

      res.render("auth/show", { showUser: users });
    } catch (error) {
      console.log(error);
    }
  }

  static async editUser(req, res) {
    const id = req.user.id;

    const user = await User.findOne({
      where: { id: id },
      raw: true,
    });
    res.render("auth/edit", { user });
  }

  static async editUserPost(req, res) {

    const id = req.user.id

    const {password, confirmpassword } = req.body;

    if (password != confirmpassword) {
      res
        .status(400)
        .json({ message: "As senhas não conferem, tente novamente !" });
      return;
    }

    if (password.length < 6) {
      res.status(411).json({ message: "Senha muito fraca !" });
      return;
    }

    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(password, salt);

    const user = {
      password: hashedPassword,
    };

    try {
      const updateUser = await User.update(user, {where: {id: id}});

      res.status(200).json({ message: "Atualização realizada com sucesso !" });
      return;
    } catch (error) {
      console.log(error);
    }
    
console.log(user)

  }

  static async deleteUser(req, res) {
    try {
      await User.destroy({ where: { id: req.params.id } });

      req.flash("success_msg", "Usuário apagado com sucesso !")
      res.redirect('/show')
      
    } catch (error) {
      req.flash("error_msg", "Não foi possivel apagar o usuário! !")
      res.redirect('/show')
    }
  }

  static logout(req, res) {
    req.logout(req.user, (err) => {
      if (err) return next(err);
      req.flash("success_msg", "Deslogado com sucesso!");
      res.redirect("/login");
    });
  }
};
