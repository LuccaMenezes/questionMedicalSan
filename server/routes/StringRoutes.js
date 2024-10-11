const router = require("express").Router();

const StringController = require("../controllers/StringController");

router.post("/stringCompleta", StringController.invertString);
router.post("/inverterPalavra", StringController.invertWordsInString);


module.exports = router;
