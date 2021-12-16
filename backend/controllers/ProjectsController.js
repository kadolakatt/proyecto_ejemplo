const express = require('express');
const { authGuard } = require('../middlewares/auth');
const { Proyecto } = require('../models/Proyecto');
const mongoose = require('mongoose');

const router = express.Router();

router.get("/all", authGuard, async (request, response) => { //habilitarla cuando se coloque el middleware
//router.get("/all", async (request, response) => {
    const page = parseInt(request.query.page);
    const limit = parseInt(request.query.limit);
    console.log(request.jwt_data); //usarla solo cuando se coloque el middleware
    const datos = await Proyecto.find({},{},{ sort: {nombre: 1 }, skip: ((page-1)*limit), limit: limit }).exec();
    response.json({ count: await Proyecto.count(), data: datos });
});

router.post("/new", authGuard, async (request, response) => {
    try {
        const proyecto = new Proyecto(request.body);
        await proyecto.save();
        response.json(proyecto);
    }catch(e) {
        response.sendStatus(500);
        console.log(e);
    }
    
});

router.put("/complete", authGuard, async (request, response) => {
    try {
        console.log(request.body);
        const id = request.body.id;
        const afectado = await Proyecto.findById(id);
        console.log(afectado);
        afectado.completado = !afectado.completado;
        await afectado.save(); 
        response.json({ id: request.id } );
    }catch(e) {
        response.sendStatus(500);
        console.log(e);
    }
    
});

router.post('/delete', authGuard, async(request, response) => {
    try {
        console.log("Borrando...");
        console.log(request.body.id);
        const id = request.body.id;
        const afectado = await Proyecto.deleteOne({ _id: id });
        console.log(afectado);
        response.json({ id: id } );
    }catch(e) {
        response.sendStatus(500);
        console.log(e);
    }
});

router.put('/edit', authGuard, async(request, response) => {
    try {
        console.log(request.body);
        const datosActualizados =  request.body;
        const afectado = await Proyecto.findByIdAndUpdate(datosActualizados._id, datosActualizados);
        console.log(afectado);
        response.json({ id: request.body._id } );
    }catch(e) {
        response.sendStatus(500);
        console.log(e);
    }
});

module.exports = router;
