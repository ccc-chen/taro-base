import * as client from "./lib/client";
import * as arr from "./lib/arr";
import * as check from "./lib/check";
import * as file from "./lib/file";
import * as obj from "./lib/obj";
import * as storage from "./lib/storage";
import * as str from "./lib/str";
import * as thrDeb from "./lib/thrDeb";
import * as time from "./lib/time";
// import * as getQueryString  from './lib/getQueryString.js'

export default {
  ...client,
  ...arr,
  ...check,
  ...file,
  ...obj,
  ...storage,
  ...str,
  ...thrDeb,
  ...time
};