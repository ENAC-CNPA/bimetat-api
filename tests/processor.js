'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

module.exports = {
  init: init,
  saveAppB: saveAppB,
  getAppA: getAppA,
  getAppAAppId: getAppAAppId,
  getAppAApiKey: getAppAApiKey,
  getAppB: getAppB,
  getAppBAppId: getAppBAppId,
  getAppBAppIdInAppBId: getAppBAppIdInAppBId,
  getAppBApiKey: getAppBApiKey,
  saveTokenA1: saveTokenA1,
  saveTokenB1: saveTokenB1,
  saveTokenB2: saveTokenB2,
  saveTokenB3: saveTokenB3,
  getTokenA1: getTokenA1,
  getTokenB1: getTokenB1,
  getTokenB2: getTokenB2,
  getTokenB3: getTokenB3,
  apiKeyLast4: apiKeyLast4,
  allGood: allGood,
  logResponse: logResponse,
  noPlansProperty: noPlansProperty,
  noNameProperty: noNameProperty,
  uploadIfcEtoy: uploadIfcEtoy,
  uploadIfcCube: uploadIfcCube,
  afterIfcUpload: afterIfcUpload
};

function init(context, ee, done) {
  done();
}

function logResponse(context, ee, done) {
  console.log(chalk.dim('  -- Response -- '));
  console.log(chalk.dim(JSON.stringify(context.vars.response, null, 2)));
  done();
}

function noPlansProperty(context, ee, done) {
  let result = {
    ok: true,
    name: 'No Plans property'
  };
  if (context.vars.response.Plans !== undefined) {
    result.ok = false;
    result.error = 'Plans property found'
  }
  console.log(JSON.stringify(result));
  done();
}

function noNameProperty(context, ee, done) {
  let result = {
    ok: true,
    name: 'No name property'
  };
  if (context.vars.response.name !== undefined) {
    result.ok = false;
    result.error = 'name property found'
  }
  console.log(JSON.stringify(result));
  done();
}

function saveAppB(context, ee, done) {
  var fileContent = "name,appId,apiKey\n";
  fileContent += "\"Secondary Test App\"," + context.vars.appId + "," + context.vars.apiKey;
  fs.writeFileSync(path.resolve(__dirname, './_data/app-b.csv'), fileContent, 'utf8');
  fs.writeFileSync(path.resolve(__dirname, './_data/app-b-appid.csv'), context.vars.appId, 'utf8');
  fs.writeFileSync(path.resolve(__dirname, './_data/app-b-apikey.csv'), context.vars.apiKey, 'utf8');
  var log = '  ** saveAppB ** ' + context.vars.appId + ' ' + context.vars.apiKey;
  console.log(chalk.dim(log));
  done();
}

function getAppA(context, ee, done) {
  var fileContent = fs.readFileSync(path.resolve(__dirname, './_data/app-a.csv'), {encoding: 'utf-8'});
  var lines = fileContent.split("\n");
  var values = lines[1].split(",");
  context.vars.appId = values[0];
  context.vars.apiKey = values[1];
  var log = '  ** getMainApp ** ' + context.vars.appId + ' ' + context.vars.apiKey;
  console.log(chalk.dim(log));
  done();
}

function getAppAAppId(context, ee, done) {
  var fileContent = fs.readFileSync(path.resolve(__dirname, './_data/app-a.csv'), {encoding: 'utf-8'});
  var lines = fileContent.split("\n");
  var values = lines[1].split(",");
  context.vars.appId = values[0];
  var log = '  ** getAppAAppId ** ' + context.vars.appId;
  console.log(chalk.dim(log));
  done();
}

function getAppAApiKey(context, ee, done) {
  var fileContent = fs.readFileSync(path.resolve(__dirname, './_data/app-a.csv'), {encoding: 'utf-8'});
  var lines = fileContent.split("\n");
  var values = lines[1].split(",");
  context.vars.apiKey = values[1];
  var log = '  ** getAppAApiKey ** ' + context.vars.apiKey;
  console.log(chalk.dim(log));
  done();
}

function getAppB(context, ee, done) {
  var fileContent = fs.readFileSync(path.resolve(__dirname, './_data/app-b.csv'), {encoding: 'utf-8'});
  var lines = fileContent.split("\n");
  var values = lines[1].split(",");
  context.vars.appId = values[1];
  context.vars.apiKey = values[2];
  var log = '  ** getAppB ** ' + context.vars.appId + ' ' + context.vars.apiKey;
  console.log(chalk.dim(log));
  done();
}

function getAppBAppId(context, ee, done) {
  var fileContent = fs.readFileSync(path.resolve(__dirname, './_data/app-b-appid.csv'), {encoding: 'utf-8'});
  context.vars.appId = fileContent
  var log = '  ** getAppBAppId ** ' + context.vars.appId;
  console.log(chalk.dim(log));
  done();
}

function getAppBAppIdInAppBId(context, ee, done) {
  var fileContent = fs.readFileSync(path.resolve(__dirname, './_data/app-b-appid.csv'), {encoding: 'utf-8'});
  context.vars.appBId = fileContent
  var log = '  ** getAppBAppIdInAppBId ** ' + context.vars.appBId;
  console.log(chalk.dim(log));
  done();
}

function getAppBApiKey(context, ee, done) {
  var fileContent = fs.readFileSync(path.resolve(__dirname, './_data/app-b-apikey.csv'), {encoding: 'utf-8'});
  context.vars.apiKey = fileContent
  var log = '  ** getAppBApiKey ** ' + context.vars.apiKey;
  console.log(chalk.dim(log));
  done();
}

function saveTokenA1(context, ee, done) {
  var fileContent = context.vars.token;
  fs.writeFileSync(path.resolve(__dirname, './_data/token-a1.csv'), fileContent, 'utf8');
  var log = '  ** saveTokenA1 ** ' + context.vars.token;
  console.log(chalk.dim(log));
  done();
}

function getTokenA1(context, ee, done) {
  var fileContent = fs.readFileSync(path.resolve(__dirname, './_data/token-a1.csv'), {encoding: 'utf-8'});
  var lines = fileContent.split("\n");
  context.vars.token = lines[0];
  var log = '  ** getTokenA1 ** ' + context.vars.token;
  console.log(chalk.dim(log));
  done();
}

function saveTokenB1(context, ee, done) {
  var fileContent = context.vars.token;
  fs.writeFileSync(path.resolve(__dirname, './_data/token-b1.csv'), fileContent, 'utf8');
  var log = '  ** saveTokenB1 ** ' + context.vars.token;
  console.log(chalk.dim(log));
  done();
}

function getTokenB1(context, ee, done) {
  var fileContent = fs.readFileSync(path.resolve(__dirname, './_data/token-b1.csv'), {encoding: 'utf-8'});
  var lines = fileContent.split("\n");
  context.vars.token = lines[0];
  var log = '  ** getTokenB1 ** ' + context.vars.token;
  console.log(chalk.dim(log));
  done();
}

function saveTokenB2(context, ee, done) {
  var fileContent = context.vars.token;
  fs.writeFileSync(path.resolve(__dirname, './_data/token-b2.csv'), fileContent, 'utf8');
  var log = '  ** saveTokenB2 ** ' + context.vars.token;
  console.log(chalk.dim(log));
  done();
}

function getTokenB2(context, ee, done) {
  var fileContent = fs.readFileSync(path.resolve(__dirname, './_data/token-b2.csv'), {encoding: 'utf-8'});
  context.vars.token = fileContent;
  var log = '  ** getTokenB2 ** ' + context.vars.token;
  console.log(chalk.dim(log));
  done();
}

function saveTokenB3(context, ee, done) {
  var fileContent = context.vars.token;
  fs.writeFileSync(path.resolve(__dirname, './_data/token-b3.csv'), fileContent, 'utf8');
  var log = '  ** saveTokenB3 ** ' + context.vars.token;
  console.log(chalk.dim(log));
  done();
}

function getTokenB3(context, ee, done) {
  var fileContent = fs.readFileSync(path.resolve(__dirname, './_data/token-b3.csv'), {encoding: 'utf-8'});
  context.vars.token = fileContent;
  var log = '  ** getTokenB3 ** ' + context.vars.token;
  console.log(chalk.dim(log));
  done();
}

function apiKeyLast4(context, ee, done) {
  context.vars.last4 = context.vars.newApiKey.substr(-4);
  var log = '  ** apiKeyLast4 ** ' + context.vars.last4;
  console.log(chalk.dim(log));
  done();
}

function allGood(context, ee, done) {
  done();
}

function uploadIfcEtoy(requestParams, context, ee, next) {

  var formData = {
    ifc: fs.createReadStream(path.join(__dirname, './_data/p5-etoy-3.ifc')),
  };

  requestParams.formData = Object.assign({}, requestParams.formData, formData);
  next();
  
}

function uploadIfcCube(requestParams, context, ee, next) {

  var formData = {
    ifc: fs.createReadStream(path.join(__dirname, './_data/cube2x3.ifc')),
  };

  requestParams.formData = Object.assign({}, requestParams.formData, formData);
  next();
  
}

function afterIfcUpload(requestParams, response, context, ee, next) {
  console.log('afterIfcUpload');
  console.log('response', response);
  next();
}