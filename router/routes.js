const router = require("express").Router();
const getRoutes = require("./get.routes");
const postRoutes = require("./post.routes");
const Session = require("../auth/sessions");
const logger = require("../logs/logger");

// console.log(logger);
router.use(logger)
router.use(Session._session());
router.use(postRoutes);
router.use(getRoutes);


module.exports = router;