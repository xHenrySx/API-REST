const mongoose = require( 'mongoose' );

// Iniciando conexion con la base de datos
mongoose.connect("mongodb+srv://api:api@cluster0.6tlb01t.mongodb.net/apiDB")
.then(() => {
    console.log("Conectado a la base de datos");
})
.catch((err) => {
    console.log("Error al conectar a la base de datos", err);
});


