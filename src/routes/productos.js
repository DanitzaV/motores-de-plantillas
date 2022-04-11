const express = require('express');
const router = express.Router();
let Contenedor = require('../manejo-de-archivos.js');
let controlador = new Contenedor("productos.txt") 

router.get("/", (req, res) => {
    try {
        controlador.getAll().then(data => {
            res.status(200).json(data);
        })
    } catch(error) {
        res.status(500).json(error.message)
    }
   
})

router.get("/:id", (req, res) => {
    const { id } = req.params
    try {
        controlador.getById(id).then(producto => {
            if (producto) {
                return res.status(200).json(producto)
            } 
            return res.status(200).json({error: "Producto no encontrado"})
        })
    } catch(error) {
        res.status(500).json(error.message)
    }
})

router.post("/", (req, res) => {
    try {
        if (req.body.title && req.body.price && req.body.thumbnail) {
            controlador.save(req.body).then(producto => {
                res.status(201).json(producto)
            })
        } else {
            res.status(400).json({error: "Complete los datos obligatorios"})
        }
    } catch(error) {
        res.status(500).json(error.message)
    }
})

router.put("/:id", (req, res) => {
    try {
        const { id } = req.params
        controlador.updateById(id, req.body).then(producto => {
            if (producto) {
                return res.status(200).json(producto)
            } 
            return res.status(200).json({error: "Producto no encontrado"})
        })
    }catch(error){
        res.status(`No se pudo actualizar el producto: ${error.message}`)
    }
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    try {
        controlador.deleteById(id).then(producto => {
            if (producto) {
                return res.send({ msg: `Producto con index ${id} borrado con exito` })
            } 
            return res.status(200).json({error: "Producto no encontrado"})
        })
    } catch(error) {
        res.status(500).json(error.message)
    }
})


module.exports = router;