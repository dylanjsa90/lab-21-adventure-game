'use strict';
// webpack assets
require('!!file?name=[name].[ext]!./html/index.html');
require('./scss/base.scss');

// npm modules
const angular = require('angular');
const gameApp = angular.module('gameApp', []);


require('./controller/app_controller.js');
