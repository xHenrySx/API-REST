import './database.js'
import app from './app.js';
import { PORT } from './config.js';

const port = PORT;


app.listen(port, () => {
    console.log(`Servidor funcionando en el puerto ${port}`);
});
