import express from 'express';
import bodyParser from 'body-parser';
import pkg from '../package.json' assert {type: 'json'};
import booksRouter from './Routes/books.routes.js';
import authRouter from './Routes/auth.routes.js';
import { createRoles } from './Libs/setUp.libs.js';

const app = express();

createRoles();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('pkg', pkg);

app.get('/', (req, res) => {
    res.json({
        author: app.get('pkg').author,
        version: app.get('pkg').version,
        name: app.get('pkg').name
    });
});

app.use("/api/books", booksRouter);

app.use('/api/auth', authRouter);


export default app;