const express = require ("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const validationRules = require("../validatorEmail/validationRules")
const validator = require("express-validator")
const transport = require("../config/nodemailer")


router.get("/", (req, res) => {
    res.render("contact")
})

const {validationResult} = validator;

router.post("/", validationRules, async (req, res) => {
    const {name, email, theme, message} = req.body

    const emailMsg = {
        to: "atencionalcliente@lgautomacion.com",
        from: email,
        subject: "Consulta sobre los materiales", 
        html: `Consulta de ${name}, el asunto es: ${theme} y su mensaje es: ${message}`
    }
    const statusMail = await transport.sendMail(emailMsg)
    console.log(statusMail)
    if(statusMail.rejected.length){
        req.app.locals.sendMailFeedback = "No se pudo enviar su mensaje, aguarde unos instantes y e intente nuevamente";
    } else {
        req.app.locals.sendMailFeedback = "Mensaje enviado correctamente";
    }

    res.redirect("/users/contact")
})


module.exports = router