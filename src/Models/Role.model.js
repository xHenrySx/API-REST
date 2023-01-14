import { Schema, model } from "mongoose";

// Esquema para la base de datos del Role

const roleSchema = new Schema({
    name: String
}, {
    versionKey: false
});

export default model('Role', roleSchema);