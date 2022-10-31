const securePass = require("../helpers/securePass")
const User = require("../box-users/boxUser")



async function getContact (req, res, next){ 
    
    const user = await User.findById(req.session.user.id, req.body).lean()
        
    res.render("contact", {user})
}



// GET LOGIN
function getLogin (req, res, next) {
    res.render("login")
}

//SEND LOGIN (Function for users)
 async function sendLogin(req, res, next){
    const {email, pass} = req.body
    const user = await User.find().where({email:email})
    if (!user.length) {
        return res.render("login", {message: "Usuario o contraseña incorrectos"})
    };
    if (await securePass.decrypt(pass, user[0].password)){
// const para obtener el id:
        const usr ={
            id: user[0]._id,
            name: user[0].name,
            lastName: user[0].lastName
        }
        req.session.user = usr
        res.redirect("secret")
    } else return res.render("login", {message: "Usuario o contraseña incorrectos"})
 }

 //GET SECRET
 
async function getSecret (req, res, next){ 
    
    const user = await User.findById(req.session.user.id, req.body).lean()
        
    res.render("secret", {user})
}
//HOME
async function getHome (req, res, next){ 
    
    const user = await User.findById(req.session.user.id, req.body).lean()
        
    res.render("home", {user})
}
//PRODUCTOS LOGUEADOS
async function getProducts (req, res, next){ 
    
    const user = await User.findById(req.session.user.id, req.body).lean()
        
    res.render("products", {user})
}

//GET REGISTER

function getRegister(req, res, next){
    res.render("register")
}

//SEND REGISTER (Function for users)

async function sendRegister(req, res, next) {
    const {name, lastName, email, pass, data} = req.body
    const password = await securePass.encrypt(pass)
  

    

    //New User with user encrypted
    const newUser = new User({
        name, lastName, email, password, data
    });

    const usr ={
        id: newUser._id,
        name: newUser.name,
        lastName: newUser.lastName
    }

    //Save New User 

    newUser.save((err) =>{
        if(!err){
            res.render("login", {message: "Usuario registrado correctamente", message1:"Para continuar inicie sesión"})
        } else {
            res.render("register", {message: "Ya existe un usuario con el email ingresado"})
        }
    })

}

//Settings para modificar o borrar datos
//Mostramos el settings
async function getSettings(req, res){
    const user = await User.findById(req.session.user.id, req.body).lean()
    
    res.render("formEdit", {user})
}

//editamos formulario
async function sendSettings(req, res){
    try{
        await User.findByIdAndUpdate(req.session.user.id, req.body)
        req.session.destroy()
        res.render("login", {message: "Cambios realizados correctamente", message1:"Para continuar vuelva a iniciar sesión"})
    } catch (error) {
        const email = req.session.user.id
        const user = await User.find().where({email:email})
    if (!user.length) {
        res.render("formEdit", {message: "Email ya registrado, intente nuevamente"})
        } else{
        res.render("formEdit", {message: "Ocurrió un error, intente nuevamente"})
     }
    }
}


//borramos cuenta
async function deleteUser(req, res){
    try{
        await User.findByIdAndDelete(req.session.user.id)
        req.session.destroy()
        res.redirect("/")
    } catch (error) {
        res.render("formEdit", {message: "Ocurrió un error, intenta nuevamente"})
    }
}

function logout (req, res){
    req.session.destroy()
    res.redirect("/")
}

module.exports = {getLogin, sendLogin, getRegister, sendRegister, getSettings, sendSettings, deleteUser, logout, getContact, getSecret, getHome, getProducts}



