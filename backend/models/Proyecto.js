const { Schema, model } = require("mongoose");

const proyectoSchema = new Schema({
    nombre: { 
                type: String, 
                max: [50, 'La longitud del campo supera lo permitido (50)'],
                required: [true, 'El nombre es obligatorio.']
            },
    fecha: { 
            type: Date, 
            required: [true, "Le fecha es obligatoria."]
           },
    descripcion: { 
                    type: String, 
                    max: [250, 'La longitud del campo supera lo permitido (250)']
                },
    director: {
                type: String,
                required: [true, 'El nombre del director es obligatorio.']
            },
    completado: {
        type: Boolean,
        required: [true, 'El estado del proyecto es obligatorio.']
    }
},
{
    collection: 'Proyectos'
});

exports.Proyecto = model('Proyecto', proyectoSchema);