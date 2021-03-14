fs = require 'fs'
path = require 'path'

exports.compress = require 'compression'
exports.errorHanlder = require 'errorhandler'
exports.bodyParser = require 'body-parser'
exports.cookieParser = require 'cookie-parser'
exports.session = require 'express-session'
exports.favicon = require 'static-favicon'
exports.logger = require 'morgan'
exports.assets = require 'connect-assets'

# `modules` can be a object
# {
#   "alias": "../middlewares/connect-middleware",
#   ...
# }
exports.load = (modules) ->
  for name, path of modules
    exports[name] = require path




