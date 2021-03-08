// import { AppMiddleware, AccessControllerMiddlware, MultipartMiddleware, ControllerMiddleware } from 'deco-api';
// import { Router } from 'express';
// import { DataModel } from './../models';
// let debug = require('debug')('app:controller:data');

// const router: Router = Router();

// let mdController = new AccessControllerMiddlware(DataModel);

// router.get(
//   ControllerMiddleware.getAllRoute(),
//   AppMiddleware.fetchWithPublicKey,
//   mdController.prepareQueryFromReq(),
//   mdController.getAll(null, {ignoreOutput: false, ignoreSend: true}),
//   mdController.autoFetch([])
// );

// router.get(
//   ControllerMiddleware.getOneRoute(),
//   AppMiddleware.fetchWithPublicKey,
//   mdController.getOne()
// );

// router.post(
//   ControllerMiddleware.postRoute(),
//   AppMiddleware.fetchWithPublicKey,
//   // AppMiddleware.addAppIdToBody('appId'),
//   MultipartMiddleware.parseDeco(<any>DataModel.deco),
//   mdController.post()
// );

// router.put(
//   ControllerMiddleware.putRoute(),
//   AppMiddleware.fetchWithPublicKey,
//   // AppMiddleware.addAppIdToBody('appId'),
//   MultipartMiddleware.parseDeco(<any>DataModel.deco),
//   mdController.put()
// );

// router.delete(
//   ControllerMiddleware.deleteRoute(),
//   AppMiddleware.fetchWithPublicKey,
//   mdController.delete()
// );

// export const DataController: Router = router;