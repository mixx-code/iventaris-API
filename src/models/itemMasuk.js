const mongoose = require("mongoose");

const Schema = mongoose.Schema;
mongoose.set("strictQuery", false);
const ItemMasuk = new Schema(
  {
    nama_item_masuk: {
      type: String,
      required: true,
    },
    jumlah_item_masuk: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ItemMasuk", ItemMasuk);
