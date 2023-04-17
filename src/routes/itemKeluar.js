const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const itemKeluarController = require("../controllers/itemKeluar");
//POST: /v1/iventaris/item-Keluar
router.post(
  "/item-Keluar",
  [
    body("nama_item_keluar")
      .isLength({ min: 1 })
      .withMessage("input nama item tidak sesuai"),
    body("jumlah_item_keluar")
      .isNumeric()
      .isLength({ min: 1 })
      .withMessage("input total stok tidak sesuai"),
  ],
  itemKeluarController.createItemKeluar
);

//GET: /v1/iventaris/items-Keluar
router.get("/items-Keluar", itemKeluarController.getAllItemKeluar);

//[GET]: /v1/blog/post/:postId
router.get("/item-Keluar/:itemId", itemKeluarController.getItemKeluarById);

//[PUT]
router.put(
  "/item-Keluar/:itemId",
  [
    body("nama_item_keluar")
      .isLength({ min: 1 })
      .withMessage("input nama item tidak sesuai"),
    body("jumlah_item_keluar")
      .isNumeric()
      .isLength({ min: 1 })
      .withMessage("input total stok tidak sesuai"),
  ],
  itemKeluarController.updateItemKeluar
);

//[DELETE]
router.delete("/item-Keluar/:itemId", itemKeluarController.deleteItemKeluar);

module.exports = router;
