import {Schema, model} from "mongoose";

// Esquema para la base de datos

// Esquema para la base de datos
const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    pages: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
},
{
    timestamps: true,
    versionKey: false
});

// Exportando el modelo
export default model('Book', bookSchema);