const { validationResult } = require("express-validator");
const ItemPost = require("../models/item");

exports.createItem = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error("Input Value Tidak sesuai!!!");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  const nama_item = req.body.nama_item;
  const total_stok = req.body.total_stok;
  const id_user = req.body.id_user;

  const Upload = new ItemPost({
    nama_item,
    total_stok,
    id_user,
  });

  Upload.save()
    .then((result) => {
      res.status(201).json({
        message: "Create Item Success",
        data: result,
      });
    })
    .catch((err) => console.log("error: ", err));
};

exports.getAllItem = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 5;
  let totalItems;
  ItemPost.find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return ItemPost.find()
        .skip((parseInt(currentPage) - 1) * parseInt(perPage))
        .limit(parseInt(perPage));
    })
    .then((result) => {
      res.status(200).json({
        message: "Data Item berhasil Dipanggil",
        data: result,
        total_data: totalItems,
        per_page: parseInt(perPage),
        current_page: parseInt(currentPage),
      });
    })
    .catch((err) => next(err));
};

exports.getItemById = (req, res, next) => {
  const itemId = req.params.itemId;
  ItemPost.findById(itemId)
    .then((result) => {
      if (!result) {
        const error = new Error("Blog Post tidak ditemukan");
        error.errorStatus = 404;
        throw error;
      }
      res.status(200).json({
        message: "Data Blog Post berhasil Dipanggil",
        data: result,
      });
    })
    .catch((err) => next(err));
};

exports.updateItem = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error("Input value tidak sesuai");
    err.errorStatus = 400;
    err.data = errors.array();
    console.log(errors.array()); // tambahkan baris ini
    return next(err);
  }

  const nama_item = req.body.nama_item;
  const total_stok = req.body.total_stok;
  const id_user = req.body.id_user;

  const itemId = req.params.itemId;

  ItemPost.findById(itemId)
    .then((result) => {
      if (!result) {
        const err = new Error("Blog tidak ditemukan");
        err.errorStatus = 404;
        return next(err);
      }
      result.nama_item = nama_item;
      result.total_stok = total_stok;
      result.id_user = id_user;

      return result.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Update Success",
        data: result,
      });
    })
    .catch((err) => next(err));
};

exports.deleteItem = (req, res, next) => {
  const itemId = req.params.itemId;

  ItemPost.findById(itemId)
    .then((result) => {
      if (!result) {
        const err = new Error("Blog tidak ditemukan");
        err.errorStatus = 404;
        throw err;
      }
      //setelah image berhasil diremove sekarang menghapus postingan nya
      return ItemPost.findByIdAndDelete(itemId);
    })
    .then((result) => {
      res.status(200).json({
        message: "Hapus Blog Post Berhasil",
        data: result,
      });
    })
    .catch((err) => next(err));
};
