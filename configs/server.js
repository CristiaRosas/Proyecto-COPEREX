'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import limiter from '../src/middlewares/validar-cant-peticiones.js';
import  { dbConnection } from './mongo.js';
import authRoutes from '../src/auth/auth.routes.js';
import companiasRoutes from  '../src/companias/compania.routes.js';

const middlewares = (app) => {
    app.use(express.urlencoded({extended : false}));
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(limiter);
};

const routes = (app) => {
    app.use('/COPEREX/v1/auth', authRoutes);
    app.use('/COPEREX/v1/compania', companiasRoutes);
};

export const conetarDB = async() => {
    try {
        await dbConnection();
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error connecting to database', error) 
    }
};

export const initServer = async () => {
    const app = express();
    const port = process.env.PORT || 3006;

    try {
        middlewares(app);
        conetarDB(app);
        routes(app);
        app.listen(port);
        console.log(`Server running on port ${port}`);
    } catch (error) {
        console.log(`Server init failed ${error}`)
    }
}

