const express = require("express");
const router = express.Router();

const pill = require("./pill");
const account = require("./account");
const pillStore = require("./pillStore");

const { onlyAdmin } = require("../common/middleware");

router.use(onlyAdmin);
router.use("/pill", pill);
router.use("/account", account);
router.use("/pill-store", pillStore);

module.exports = router;