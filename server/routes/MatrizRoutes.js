const router = require("express").Router();

const MatrizController = require("../controllers/MatrizController");

router.post("/gerarMatriz", MatrizController.gerarMatriz);
router.post("/transporMatriz", MatrizController.transporMatriz);


module.exports = router;
