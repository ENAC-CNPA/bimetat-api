/// <reference types="node" />

declare module 'smsapicom' {
  var SMSAPI: any;
  export = SMSAPI;
}

declare module 'object-resolve-path' {
  var resolvePath: any;
  export = resolvePath;
}

declare module 'traverse-async' {
  var traverse: (
    object: any, 
    callback: (this: {parent: any, node: any, key: string, path: Array<string>}, node: any, next: function) => any,
    onComplete?: (newObj: any) => any,
    onError?: (error: Error) => any) => {};
  var config: any;
  export {traverse, config};
}