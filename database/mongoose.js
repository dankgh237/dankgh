const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname, "../.env") });
const localDB = process.env.MONGODB_LOCAL;
const atlasDB = process.env.MONGODB_ATLAS;

function DBConnection(app,port) {
  const db = mongoose.connect(atlasDB);
  db.then((item) => console.log(`Mongodb Connected successfully @ ${item.connection.host}`));
  db.catch((err) => console.log(err));
  db.then(() => app.listen(port,()=>console.log(`server running on port: ${port}`)));
}

module.exports = DBConnection;
