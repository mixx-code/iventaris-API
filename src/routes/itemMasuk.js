const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const itemMasukController = require("../controllers/itemMasuk");
//POST: /v1/iventaris/item-masuk
router.post(
  "/item-masuk",
  [
    body("nama_item_masuk")
      .isLength({ min: 1 })
      .withMessage("input nama item tidak sesuai"),
    body("jumlah_item_masuk")
      .isNumeric()
      .isLength({ min: 1 })
      .withMessage("input total stok tidak sesuai"),
  ],
  itemMasukController.createItemMasuk
);

//GET: /v1/iventaris/items-masuk
router.get("/items-masuk", itemMasukController.getAllItemMasuk);

//[GET]: /v1/blog/post/:postId
router.get("/item-masuk/:itemId", itemMasukController.getItemMasukById);

//[PUT]
router.put(
  "/item-masuk/:itemId",
  [
    body("nama_item_masuk")
      .isLength({ min: 1 })
      .withMessage("input nama item tidak sesuai"),
    body("jumlah_item_masuk")
      .isNumeric()
      .isLength({ min: 1 })
      .withMessage("input total stok tidak sesuai"),
  ],
  itemMasukController.updateItemMasuk
);

//[DELETE]
router.delete("/item-masuk/:itemId", itemMasukController.deleteItemMasuk);

module.exports = router;
