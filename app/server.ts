import { DecoRoutes, datastore, Log, CorsMiddleware, ErrorsMiddleware  } from 'deco-api';
import { BcfRoutes } from 'deco-bcf';
import { ThreeRoutes } from 'deco-three';
import express from 'express';
import compression from 'compression';
import { AnalyticsController, ProxyController } from './controllers';
import dotenv from 'dotenv';
dotenv.config();

// import './helpers/notificationPushService';

// Add Policies

let debug = require('debug')('app:server');
let env = process.env.NODE_ENV || "development";
 

let dbhost = (process.env.DBHOST) || 'localhost';
let dbuser = (process.env.DBUSER) || '';
let dbpass = (process.env.DBPASS) || '';
let dbport = (process.env.DBPORT) || '27017';
let databaseName = (process.env.DBNAME) || 'sdio';
const shoudlPrefixProdDb = process.env.DBPREFIXPROD ? true : false;
let database = (env === 'production' && shoudlPrefixProdDb) ? `${databaseName}prod` : `${databaseName}`;
datastore.init({database: database, host: dbhost, user: dbuser, password: dbpass, port: dbport}).connect().then(() => {
    const app: express.Application = express();
    app.use(express.json({limit: '10mb'}));

    if (process.env.GZIP) {
        app.use(compression());
    }

    // The port the express app will listen on
    const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
    // enable logging
    app.use(Log.accessMiddleware());
    app.use(CorsMiddleware.allowEverything());

    app.use(DecoRoutes);
    
    app.use('/analytics', AnalyticsController);
    app.use('/proxy', ProxyController);
  

    app.use('/three', ThreeRoutes);
    app.use('/bcf', BcfRoutes);


    // server errors in JSON
    app.use(ErrorsMiddleware.convertToJsonOutput);

    // Serve the application at the given port
    app.listen(port, () => {
        // Success callback
        debug(`Environment: ${env}`);
        debug(`Listening at http://0.0.0.0:${port}/`);
    });

});