const { raw } = require("body-parser");
const Moviments = require("../models/Moviment");
const User = require("../models/User");

module.exports = class MovimentsController {
  static async createLoading(req, res) {
    res.render("loading/create");
  }

  static async createLoadingSave(req, res) {


    const pedidos ={
      silo:req.body.silo,
      product:req.body.product,
      batch: req.body.batch,
      amount: req.body.amount,
      date: req.body.date,
      type: "Carregamento"
    }

    try {
      await Moviments.create(pedidos);
      console.log(pedidos)
      
      res.status(200).json({ message: "Carregamento realizado com sucesso !" });
    } catch (error) {
      res.status(400).json({
        message: "Não foi possivel registar o carregamento !" + console.log(error),
      });
      return;
    }
    };

    
    
  

  static async showLoadind(req, res) {
    try {
      const showLoadind = await Moviments.findAll({
        include: User,
      });

      const loading = showLoadind.map((result) => result.get({ plain: true }));

      res.render("loading/show", { loading: loading });
    } catch (error) {
      console.log(error);
    }
  }

  static async editLoading(req, res) {
    const id = req.params.id;

    const loading = await Moviments.findOne({
      where: { id: id },
      raw: true,
    });
    console.log(loading);
    res.render("loading/edit", { loading });
  }

  static async editLoadingPost(req, res) {
    const id = req.params.id;

    const editLoading = {
      UserId: req.user.id,
      silo: req.body.silo,
      product: req.body.product,
      amount: req.body.amount,
      batch: req.body.batch,
      date: req.body.date,
      type: "Editar",
    };
    try {
      await Moviments.update(editLoading, { where: { id: id } });

      res.status(200).json({
        message: "Carregamento atualizado com sucesso !"
      });

      return;
    } catch (error) {
      res.status(400).json({
        message:
          "Não foi possivel encontrar o carregamento !" + console.log(error),
      });
      return;
      
    }
    
  }
  
};
