const { application } = require("express");
const validator = require("express-validator")
const { body, validationResult } = validator

const validationRules = [
    body("name")

    .notEmpty().withMessage({name1: "Debe ingresar su nombre"})
    .isLength({min:2, max: 30}).withMessage({ name2: "Este debe contener más de 2 caracteres"}),

    body("email")

    .notEmpty().withMessage({email1: "Campo Obligatorio"})
    .isEmail().withMessage({email2: "Debe ingresar un email válido"}),

    body("theme")

    .notEmpty().withMessage({theme1:"Debe ingresar un asunto"})
    .isLength({min:10, max: 40}).withMessage({theme2: "El mismo debe de contener entre 10 y 40 caracteres"}),

    body("message")

    .notEmpty().withMessage({message1: "Debe ingresar su mensaje por favor"})
    .trim("")
    .isLength({min:10, max: 300}).withMessage({message2: "Este debe contener entre 10 y 300 caracteres"}),

    (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            const contactData = req.body
            const arrErrors = errors.array()
             res.render("contact", {contactData, arrErrors})    

        } else return next()
    }
];

module.exports = validationRules;