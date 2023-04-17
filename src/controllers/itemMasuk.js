const { validationResult } = require("express-validator");
const ItemMasuk = require("../models/itemMasuk");

exports.createItemMasuk = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error("Input Value Tidak sesuai!!!");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  const nama_item_masuk = req.body.nama_item_masuk;
  const jumlah_item_masuk = req.body.jumlah_item_masuk;

  const Upload = new ItemMasuk({
    nama_item_masuk,
    jumlah_item_masuk,
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

exports.getAllItemMasuk = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage;
  let totalItems;
  ItemMasuk.find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return ItemMasuk.find()
        .skip((parseInt(currentPage) - 1) * parseInt(perPage))
        .limit(parseInt(perPage))
        .sort({ createdAt: -1 }); // tambahkan metode sort() untuk mengurutkan data berdasarkan createdAt dari terbaru ke terlama
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

exports.getItemMasukById = (req, res, next) => {
  const itemId = req.params.itemId;
  ItemMasuk.findById(itemId)
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

exports.updateItemMasuk = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error("Input value tidak sesuai");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  const nama_item_masuk = req.body.nama_item_masuk;
  const jumlah_item_masuk = req.body.jumlah_item_masuk;

  const itemId = req.params.itemId;

  ItemMasuk.findById(itemId)
    .then((result) => {
      if (!result) {
        const err = new Error("Blog tidak ditemukan");
        err.errorStatus = 404;
        throw err;
      }
      result.nama_item_masuk = nama_item_masuk;
      result.jumlah_item_masuk = jumlah_item_masuk;

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

exports.deleteItemMasuk = (req, res, next) => {
  const itemId = req.params.itemId;

  ItemMasuk.findById(itemId)
    .then((result) => {
      if (!result) {
        const err = new Error("Blog tidak ditemukan");
        err.errorStatus = 404;
        throw err;
      }
      //setelah image berhasil diremove sekarang menghapus postingan nya
      return ItemMasuk.findByIdAndDelete(itemId);
    })
    .then((result) => {
      res.status(200).json({
        message: "Hapus Blog Post Berhasil",
        data: result,
      });
    })
    .catch((err) => next(err));
};
