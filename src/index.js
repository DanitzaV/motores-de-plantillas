const express = require('express');
const path = require('path');
const mainRouter = require('./routes/index');
let Contenedor = require('./manejo-de-archivos.js');
let controlador = new Contenedor("productos.txt")

const app = express();
const publicPath = path.resolve(__dirname,'../public');
app.use("/public", express.static(publicPath));
const servidor = app.listen(8080, () => {
    console.log("servidor corriendo en puerto " + 8080);
})
app.set('view engine', 'pug');
const viewsPath = path.resolve(__dirname, '../views');
app.set(express.static(viewsPath));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use("/api", mainRouter);

app.get("/", (req, res) => {
    res.render('formulario');
});

app.get("/productos", (req, res) => {
    controlador.getAll().then(productos => {
        res.render('productos', {
            productos
        });
    })
});

app.post("/productos", (req, res) => {
    const {
        title,
        price,
        thumbnail
    } = req.body;
    if (
        typeof title != "undefined" &&
        typeof price != "undefined" &&
        typeof thumbnail != "undefined"
    ) {
        controlador.save(req.body).then(producto => {
            res.redirect("/productos");
        })
    }
});

servidor.on("error", (err) => {
    console.log("error", err);
})