const router = require("express").Router();

const UsersController = require("../controllers/UsersController");

router.post("/login", UsersController.login);
router.get("/checkUser", UsersController.checkUser);
router.post('/create', UsersController.create);
router.put('/update/:id', UsersController.update);
router.delete('/delete/:id', UsersController.delete);
router.get('/:id', UsersController.getById);
router.get('/', UsersController.getAll);

module.exports = router;
