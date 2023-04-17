const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const itemController = require("../controllers/item");
//POST: /v1/iventaris/item
router.post(
  "/item",
  [
    body("nama_item")
      .isLength({ min: 1 })
      .withMessage("input nama item tidak sesuai"),
    body("total_stok")
      .isNumeric()
      .isLength({ min: 1 })
      .withMessage("input total stok tidak sesuai"),
  ],
  itemController.createItem
);

//GET: /v1/item/posts
router.get("/items", itemController.getAllItem);

//[GET]: /v1/blog/post/:postId
router.get("/item/:itemId", itemController.getItemById);

//[PUT]
router.put(
  "/item/:itemId",
  [
    body("nama_item")
      .isLength({ min: 1 })
      .withMessage("Input nama item tidak sesuai"),
    body("total_stok")
      .isNumeric()
      .isLength({ min: 1 })
      .withMessage("Input total stok tidak sesuai"),
  ],
  itemController.updateItem
);

//[DELETE]
router.delete("/item/:itemId", itemController.deleteItem);

module.exports = router;
