import { DecoRoutes, datastore, Log, CorsMiddleware, ErrorsMiddleware  } from 'deco-api';
import { BcfRoutes } from 'deco-bcf';
import { ThreeRoutes } from 'deco-three';
import express from 'express';
import compression from 'compression';
import { AnalyticsController, ProxyController } from './controllers';
import dotenv from 'dotenv';
dotenv.config();

// import './helpers/notificationPushService';

// Add Policies

let debug = require('debug')('app:server');
let env = process.env.NODE_ENV || "development";
 

let dbhost = (process.env.DBHOST) || 'localhost';
let dbuser = (process.env.DBUSER) || '';
let dbpass = (process.env.DBPASS) || '';
let dbport = (process.env.DBPORT) || '27017';
let databaseName = (process.env.DBNAME) || 'sdio';
datastore.init({database: databaseName, host: dbhost, user: dbuser, password: dbpass, port: dbport}).connect().then(() => {
    const app: express.Application = express();
    app.use(express.json({limit: '10mb'}));

    if (process.env.GZIP) {
        app.use(compression());
    }

    // The port the express app will listen on
    const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
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
    const server = app.listen(port, () => {
        console.log('App started')
        // Success callback
        debug(`Environment: ${env}`);
        debug(`Listening at http://0.0.0.0:${port}/`);
    });

    process.on('SIGTERM', function onSigterm () {
        shutdown()
    })
    process.on('SIGINT', function onSigterm () {
        shutdown()
    })
    process.on('SIGSHUT', function onSigterm () {
        shutdown()
    })

    function shutdown() {
        console.info('Graceful shutdown start', new Date().toISOString());
        datastore.close().then(() => {
            console.info('Database closed');
        }).catch((error) => {
            console.info('Failed to close database');
            console.error(error);
        }).finally(() => {
            server.close(function onServerClosed (err) {
                if (err) {
                    console.info('Failed to close server');
                    console.error(err)
                    process.exit(1)
                } else {
                    console.info('Closed server');
                    process.exit()
                }
            })
        });
        
    }

});