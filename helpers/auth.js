//autorización para ingresar a /secret
const auth = (req, res, next) =>{
    if(req.session.user){
        next()
    }else  res.render("noAuth")
}  

module.exports = auth
