const { validationResult } = require("express-validator");
const ItemKeluar = require("../models/itemKeluar");

exports.createItemKeluar = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error("Input Value Tidak sesuai!!!");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  const nama_item_keluar = req.body.nama_item_keluar;
  const jumlah_item_keluar = req.body.jumlah_item_keluar;

  const Upload = new ItemKeluar({
    nama_item_keluar,
    jumlah_item_keluar,
  });

  Upload.save()
    .then((result) => {
      res.status(201).json({
        message: "Create Item Keluar Success",
        data: result,
      });
    })
    .catch((err) => console.log("error: ", err));
};

exports.getAllItemKeluar = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage;
  let totalItems;
  ItemKeluar.find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return ItemKeluar.find()
        .skip((parseInt(currentPage) - 1) * parseInt(perPage))
        .limit(parseInt(perPage))
        .sort({ createdAt: -1 }); // tambahkan metode sort() untuk mengurutkan data berdasarkan createdAt dari terbaru ke terlama
    })
    .then((result) => {
      res.status(200).json({
        message: "Data Item Keluar berhasil Dipanggil",
        data: result,
        total_data: totalItems,
        per_page: parseInt(perPage),
        current_page: parseInt(currentPage),
      });
    })
    .catch((err) => next(err));
};

exports.getItemKeluarById = (req, res, next) => {
  const itemId = req.params.itemId;
  ItemKeluar.findById(itemId)
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

exports.updateItemKeluar = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error("Input value tidak sesuai");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  const nama_item_keluar = req.body.nama_item_keluar;
  const jumlah_item_keluar = req.body.jumlah_item_keluar;

  const itemId = req.params.itemId;

  ItemKeluar.findById(itemId)
    .then((result) => {
      if (!result) {
        const err = new Error("Blog tidak ditemukan");
        err.errorStatus = 404;
        throw err;
      }
      result.nama_item_keluar = nama_item_keluar;
      result.jumlah_item_keluar = jumlah_item_keluar;

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

exports.deleteItemKeluar = (req, res, next) => {
  const itemId = req.params.itemId;

  ItemKeluar.findById(itemId)
    .then((result) => {
      if (!result) {
        const err = new Error("Blog tidak ditemukan");
        err.errorStatus = 404;
        throw err;
      }
      //setelah image berhasil diremove sekarang menghapus postingan nya
      return ItemKeluar.findByIdAndDelete(itemId);
    })
    .then((result) => {
      res.status(200).json({
        message: "Hapus Blog Post Berhasil",
        data: result,
      });
    })
    .catch((err) => next(err));
};
