const mongoose = require("mongoose");

const Schema = mongoose.Schema;
mongoose.set("strictQuery", false);
const ItemPost = new Schema({
  nama_item: {
    type: String,
    required: true,
  },
  total_stok: {
    type: Number,
    required: true,
  },
  id_user: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("ItemPost", ItemPost);
