/* #############################################################################################################
        Import mongodb database connection, mongoose and define mongoose.schema
   ###############################################################################################################*/
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

class mongooseModel {
  /* #############################################################################################################
        mail schema model
   ###############################################################################################################*/
  static email = mongoose.model(
    "email",
    new Schema({
      name: String,
      email: String,
      subject: String,
      message: { type: String },
      date: { type: Date, default: Date.now },
    })
  );
  static async Email(value) {
    return new this.email({
      name: value.name,
      email: value.email,
      subject: value.subject,
      message: value.message,
    });
  }
  /* #############################################################################################################
        registration schema model
   ###############################################################################################################*/
  static Users = mongoose.model(
    "Users",
    new Schema({
      firstname: String,
      lastname: String,
      email: String,
      password: String,
      "confirm password": { type: String },
      date: { type: Date, default: Date.now },
    })
  );
  static async Register(value) {
    return new this.Users({
      firstname: value.firstname,
      lastname: value.lastname,
      email: value.email,
      password: value.password,
      "confirm password": value["confirm password"],
    });
  }
  /* #############################################################################################################
        login schema model
   ###############################################################################################################*/
  static login = mongoose.model(
    "login",
    new Schema({
      email: String,
      password: String,
      date: { type: Date, default: Date.now },
    })
  );

  static async Login(value) {
    return new this.login({ email: value.email, password: value.password });
  }

  /* #############################################################################################################
        login schema model
   ###############################################################################################################*/
  static route = mongoose.model(
    "route",
    new Schema({
      path: { type: String, default: "path" },
      route: { type: String },
      date: { type: Date, default: Date.now },
    })
  );

  static async Route(val) {
    return await new this.route({ route: val }).save();
  }
  static async setRoute(val) {
    await mongooseModel.route.findOneAndUpdate(
      { path: "path" },
      { route: val },
      null
    );
  }
}

mongooseModel.Route("/"); //instantiate the route path to home (/)

/* #############################################################################################################
        Export defined models
   ###############################################################################################################*/
module.exports = mongooseModel;
