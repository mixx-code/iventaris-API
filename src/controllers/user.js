const { validationResult } = require("express-validator");
const user = require("../models/user");

exports.createUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error("Input Value Tidak sesuai!!!");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  const nama = req.body.nama;
  const email = req.body.email;
  const password = req.body.password;

  // Cek apakah email sudah digunakan sebelumnya
  user
    .findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(400).json({ message: "Email sudah terdaftar" });
      }

      // Buat objek user baru
      const newUser = new user({
        nama: nama,
        email: email,
        password: password,
      });

      // Simpan user ke database
      return newUser.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "Create user Success",
        data: result,
      });
    })
    .catch((error) => {
      console.log("error: ", error);
      next(error);
    });
};

exports.userLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  // Cari pengguna dengan email yang diberikan
  user
    .findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ message: "Email atau password salah" });
      }

      // Bandingkan password yang dimasukkan dengan password yang di-hash di database
      user
        .comparePassword(password)
        .then((isMatch) => {
          if (!isMatch) {
            return res
              .status(400)
              .json({ message: "Email atau password salah" });
          }

          // Simpan data user ke session
          req.session.user = {
            id: user._id,
            name: user.name,
            email: user.email,
          };

          res.json({
            message: "Login berhasil",
            user: {
              id: req.session.user.id,
              name: req.session.user.name,
              email: req.session.user.email,
            },
          });
        })
        .catch((error) => {
          next(error);
        });
    })
    .catch((error) => {
      next(error);
    });
};

exports.getAllUser = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 5;
  let totalItems;
  user
    .find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return user
        .find()
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

exports.getUserById = (req, res, next) => {
  const userId = req.params.userId;
  user
    .findById(userId)
    .then((result) => {
      if (!result) {
        const error = new Error("User tidak ditemukan");
        error.errorStatus = 404;
        throw error;
      }
      res.status(200).json({
        message: "Data user berhasil Dipanggil",
        data: result,
      });
    })
    .catch((err) => next(err));
};
