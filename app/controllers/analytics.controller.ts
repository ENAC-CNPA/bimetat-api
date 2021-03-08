import { Router } from 'express';
import { AnalyticsModel } from './../models';
import { ControllerMiddleware, AppMiddleware } from 'deco-api';
let debug = require('debug')('app:controller:dico');

const router: Router = Router();

let mdController = new ControllerMiddleware(AnalyticsModel);

router.post(
  ControllerMiddleware.postRoute(),
  AppMiddleware.fetchWithPublicKey,
  // AppMiddleware.addAppIdToBody('appId'),
  mdController.post()
);

export const AnalyticsController: Router = router;