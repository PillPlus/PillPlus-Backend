const express = require("express");
const router = express.Router();

const auth = require("./auth");
const pill = require("./pill");
const account = require("./account");
const pillStore = require("./pillStore");
const pillStorehouse = require("./pillStorehouse");
const picture = require("./picture");
const prescription = require("./prescription");
const invoice = require("./invoice");

const expressJwt = require("express-jwt");
const { notFound, verifyToken } = require("../common/middleware");
const { errorRes } = require("../common/response");

router.get("/ping", (req, res) => res.json("pong"));

router.use(
  expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS512"],
    credentialsRequired: false,
    getToken: function fromHeader(req) {
      if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
      ) {
        return req.headers.authorization.split(" ")[1];
      } else if (req.cookies.cookieToken) {
        return req.cookies.cookieToken;
      }
      return null;
    },
  }),
  (err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
      console.error(req.user, req.ip, "invalid token");
      return errorRes(res, err, "Login to proceed", 401);
    }
    next();
  }
);

router.use("/auth", auth);
router.use("/prescription", prescription);

router.use(verifyToken);
router.use("/pill", pill);
router.use("/account", account);
router.use("/picture", picture);
router.use("/invoice", invoice);
router.use("/pillStore", pillStore);
router.use("/pillStorehouse", pillStorehouse);
router.use(notFound);

module.exports = router;
