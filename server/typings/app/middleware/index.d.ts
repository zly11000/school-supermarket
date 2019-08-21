// This file is created by egg-ts-helper@1.25.5
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportLoginAuthority = require('../../../app/middleware/loginAuthority');

declare module 'egg' {
  interface IMiddleware {
    loginAuthority: typeof ExportLoginAuthority;
  }
}
