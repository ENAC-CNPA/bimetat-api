import { Router, Request, Response, NextFunction } from 'express';
import { AuthMiddleware, AppMiddleware } from 'deco-api';
import fs from 'fs';
import multer from 'multer';
let upload = multer({dest: './proxy-files'});
let debug = require('debug')('app:controller:proxy');

const router: Router = Router();

function fileI(req: Request, res: Response, next: NextFunction) {
  let file = req.file;
  res.send(file);
}

function fileO(req: Request, res: Response, next: NextFunction) {

  let mimetype = (req.query.m as string);
  let filename = (req.query.n as string);
  let size = (req.query.s as string);
  let path = (req.query.p as string);

  res.setHeader('Content-Type', mimetype);
  res.setHeader('Content-Disposition', 'attachment; filename="' + encodeURIComponent(filename) + '"');
  res.setHeader('Content-Length', size);
  let stream = fs.createReadStream(path);
  stream.pipe(res);
}

function fileIO(req: Request, res: Response, next: NextFunction) {
  let file = req.file;
  res.setHeader('Content-Type', file.mimetype);
  let filename = file.originalname;
  res.setHeader('Content-Disposition', 'attachment; filename="' + encodeURIComponent(filename) + '"');
  res.setHeader('Content-Length', file.size);
  let stream = fs.createReadStream(file.path);
  stream.pipe(res);
}

router.post(
  '/fileio',
  AppMiddleware.fetchWithPublicKey,
  AuthMiddleware.authenticate,
  upload.single('file'),
  fileIO
);

router.post(
  '/filei',
  AppMiddleware.fetchWithPublicKey,
  AuthMiddleware.authenticate,
  upload.single('file'),
  fileI
);

router.get(
  '/fileo',
  AppMiddleware.fetchWithPublicKey,
  fileO
);

export const ProxyController: Router = router;