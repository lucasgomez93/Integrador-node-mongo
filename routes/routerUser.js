//Rutas de usuarios

const router= require("express").Router()


const User = require("../box-users/boxUser")
const users = require("../controllers/usersCt")
const contact= require("../routes/contact")
const auth = require("../helpers/auth") 

router.get("/login", users.getLogin)
router.post("/login", users.sendLogin)
router.get("/register", users.getRegister)
router.post("/register", users.sendRegister) 
router.get("/logout", users.logout)
router.get("/contact", auth, users.getContact)
router.get("/home", auth, users.getHome)
router.get("/products", auth, users.getProducts)
router.get("/secret", auth, users.getSecret)
router.get("/settings", auth,  users.getSettings) 
router.post("/settings", auth, users.sendSettings)
router.get("/delete", auth, users.deleteUser)


module.exports = router;