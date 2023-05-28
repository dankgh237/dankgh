const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../.env") });
const localDB = process.env.MONGODB_LOCAL;
const atlasDB = process.env.MONGODB_ATLAS;
const store = new MongoDBStore({
  uri: atlasDB,
  collection: "sessions",
  expires: 1000 * 60,
});
store.on("error", (error) => console.log(error));

class Session {
  static _session() {
    return session({
      cookie: { secure: false, maxAge: 1000 * 60 },
      resave: false,
      saveUninitialized: true,
      secret: process.env.SESSION_SECRET,
      store,
    });
  }

  static async auth(req, res, next) {
    if (req.session.isLoggedIn) next();
    else res.redirect("/form");
  }

  static logout(req, res, next) {
    req.session.destroy(() => {
      res.redirect("/form");
    });
  }
  static secure (app){
    if (app.get('env') === 'production') {
      app.set('trust proxy', 1) // trust first proxy
      session.cookie.secure = true // serve secure cookies
    }
  }
}

module.exports = Session;
