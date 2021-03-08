import { model, Model, type, io, query, validate, ObjectId, AppModel, mongo } from 'deco-api';
let debug = require('debug')('app:models:analytics');

@model('analytics')
export class AnalyticsModel extends Model {

  @type.model({model: AppModel})
  @io.input
  @io.toDocument
  @query.filterable({type: 'auto'})
  @validate.required
  @mongo.index({type: 'single'})
  public appId: ObjectId | null = null;

  @type.string
  @io.input
  @validate.required
  sessionId: string = '';

  @type.string
  @io.input
  identity: string

  @type.string
  @io.input
  @validate.required
  type: 'navigation' | 'click' | 'event' = 'navigation';

  @type.string
  @io.input
  @validate.required
  path: string

  @type.string
  @io.input
  category: any;

  @type.string
  @io.input
  action: any;

  @type.string
  @io.input
  title: any;

  @type.string
  @io.input
  value: any;
}