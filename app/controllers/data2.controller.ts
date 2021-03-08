// import { Router } from 'express';
// import { Data2Model } from './../models';
// import { ControllerMiddleware, AppMiddleware, AccessControllerMiddlware, MultipartMiddleware } from 'deco-api';
// let debug = require('debug')('app:controller:data');

// const router: Router = Router();

// let mdController = new AccessControllerMiddlware(Data2Model);

// router.get(
//   ControllerMiddleware.getAllRoute(),
//   AppMiddleware.fetchWithPublicKey,
//   mdController.prepareQueryFromReq(),
//   mdController.getAll()
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
//   MultipartMiddleware.parseDeco(<any>Data2Model.deco),
//   mdController.post()
// );

// router.put(
//   ControllerMiddleware.putRoute(),
//   AppMiddleware.fetchWithPublicKey,
//   // AppMiddleware.addAppIdToBody('appId'),
//   MultipartMiddleware.parseDeco(<any>Data2Model.deco),
//   mdController.put()
// );

// router.delete(
//   ControllerMiddleware.deleteRoute(),
//   AppMiddleware.fetchWithPublicKey,
//   mdController.delete()
// );

// export const Data2Controller: Router = router;