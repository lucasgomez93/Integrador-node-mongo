require("./config/mongo")
const express = require("express");
const hbs = require("express-handlebars");
const PORT = 3000;
const app = express();
const routerContact = require("./routes/contact");
const path = require("path");
const {log} = require("console");
const session = require("express-session");


app.use(session({
    secret:process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.locals.sendMailFeedback = "";

app.listen(PORT, (err) => {
    err ? console.log(`Error: ${err}`)
    :
    console.log(`Servidor inicializado en http://localhost:${PORT}`)
})

app.use(express.static(path.join(__dirname, "/public"))); //uso de la carpeta public para recursos estáticos
app.use(express.json());
app.use(express.urlencoded({extended: false})); // habilitacion de la lectura de datos

//Express-Handlebars config
app.engine(".hbs", hbs.engine({ extname: "hbs" }))
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/views"));

//Render de views

app.get("/", (req, res) => {
    res.render("home")
})

//el contact lo renderizamos directamente desde el contact.js con app.use
app.use("/contact", routerContact);

app.get("/products", (req, res) => {
    res.render("products")
})

app.use("/users", require("./routes/routerUser"))




