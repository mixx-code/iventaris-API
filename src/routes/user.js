const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
module.exports = router;
const userController = require("../controllers/user");
//POST: /v1/iventaris/item-masuk
router.post(
  "/registrasi",
  [
    body("nama").isLength({ min: 3 }).withMessage("input nama tidak sesuai"),
    body("email")
      .isEmail()
      .isLength({ min: 5 })
      .withMessage("input email tidak sesuai"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("input password tidak sesuai"),
  ],
  userController.createUser
);
router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .isLength({ min: 5 })
      .withMessage("input email tidak sesuai"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("input password tidak sesuai"),
  ],
  userController.userLogin
);

router.get("/users", userController.getAllUser);
router.get("/user/:userId", userController.getUserById);
// //GET: /v1/iventaris/items-masuk
// router.get("/items-masuk", itemMasukController.getAllItemMasuk);

// //[GET]: /v1/blog/post/:postId
// router.get("/item-masuk/:itemId", itemMasukController.getItemMasukById);

// //[PUT]
// router.put(
//   "/item-masuk/:itemId",
//   [
//     body("nama_item_masuk")
//       .isLength({ min: 1 })
//       .withMessage("input nama item tidak sesuai"),
//     body("jumlah_item_masuk")
//       .isNumeric()
//       .isLength({ min: 1 })
//       .withMessage("input total stok tidak sesuai"),
//   ],
//   itemMasukController.updateItemMasuk
// );

// //[DELETE]
// router.delete("/item-masuk/:itemId", itemMasukController.deleteItemMasuk);

// module.exports = router;
