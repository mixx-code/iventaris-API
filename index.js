const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const itemRoutes = require("./src/routes/item");
const itemMasukRoutes = require("./src/routes/itemMasuk");
const itemKeluarRoutes = require("./src/routes/itemKeluar");
const userRoutes = require("./src/routes/user");
const cors = require("cors");
const session = require("express-session");
//PORT SERVER
const port = process.env.PORT || 4000;
//DATABASE
const database =
  process.env.MONGO_URI ||
  "mongodb+srv://rizki:kuqnJVI5lUntdwzb@barang.gtwgtgh.mongodb.net/item?retryWrites=true&w=majority";

const app = express();
app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
  })
);
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
  })
);
// Konfigurasi session

//GET
app.use("/v1/iventaris", itemRoutes);
app.use("/v1/iventaris", itemMasukRoutes);
app.use("/v1/iventaris", userRoutes);
app.use("/v1/iventaris", itemKeluarRoutes);

mongoose
  .connect(database, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(port, () =>
      console.log(`server connect to ${port}, success....`)
    );
  })
  .catch((err) => console.log(err));

mongoose.connection.on("connected", () =>
  console.log(`${database}, terkoneksi...`)
);
