const mongoose = require("mongoose");
const Product = mongoose.model("Product");
const validationContract = require("../validators/fluentValidator");

exports.get = (req, res, next) => {
  Product.find({ active: true }, "title price slug")
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};

exports.getById = (req, res, next) => {
  Product.findById(req.params.id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};

exports.getBySlug = (req, res, next) => {
  Product.findOne(
    { slug: req.params.slug, active: true },
    "title description price slug tags"
  )
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};

exports.getByTag = (req, res, next) => {
  Product.find(
    { tags: req.params.tag, active: true },
    "title description price slug tags"
  )
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};

exports.post = (req, res, next) => {
  let contract = new validationContract();
  contract.hasMinLen(
    req.body.title,
    3,
    "O titulo deve conter pelo menos 3 caracteres"
  );
  contract.hasMinLen(
    req.body.description,
    3,
    "A descrição deve conter pelo menos 3 caracteres"
  );
  contract.hasMinLen(
    req.body.slug,
    3,
    "O slug deve conter pelo menos 3 caracteres"
  );

  //verifica se são inválidos
  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }

  const product = new Product(req.body);
  product.title = req.body.title;
  // product.slug = req.body.slug;
  // product.description = req.body.description;
  // product.price = req.body.price;
  // product.tags = req.body.tags;
  product
    .save()
    .then((data) => {
      res.status(201).send({ message: "Produto cadastrado com sucesso!" });
    })
    .catch((e) => {
      res.status(400).send({ message: "Erro ao cadastrar o produto", data: e });
    });
};

exports.put = (req, res, next) => {
  Product.findByIdAndUpdate(req.params.id, {
    $set: {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      slug: req.body.slug,
    },
  })
    .then((data) => {
      res.status(201).send({ message: "Produto atualizado com sucesso!" });
    })
    .catch((e) => {
      res.status(400).send({ message: "Falha ao atializar produto", data: e });
    });
};

exports.delete = (req, res, next) => {
  Product.findOneAndDelete(req.body.id)
    .then((data) => {
      res.status(200).send({
        message: "produto removido com sucesso!",
      });
    })
    .catch((e) => {
      res.status(400).send({ message: "Falha ao excluir o produto", data: e });
    });
};
