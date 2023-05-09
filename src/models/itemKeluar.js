const mongoose = require("mongoose");

const Schema = mongoose.Schema;
mongoose.set("strictQuery", false);
const ItemKeluar = new Schema(
  {
    nama_item_keluar: {
      type: String,
      required: true,
    },
    jumlah_item_keluar: {
      type: Number,
      require: true,
    },
    id_item: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ItemKeluar", ItemKeluar);
