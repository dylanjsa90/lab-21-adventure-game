'use strict';

const angular = require('angular');
const gameApp = angular.module('gameApp');

gameApp.controller('GameController', ['$log', GameController]);

function GameController($log) {
  this.history = [ {id: 0, text: 'You are on an adventure'}];

  this.directions = ['north', 'south', 'east', 'west'];
  this.player = {
    name: 'simon',
    location: 'roomA',
  };

  this.map = require('../lib/map.js');

  this.moveDirection = function(direction) {
    if (this.map[this.player.location]) {
      let currentLocation = this.map[this.player.location];
      let nextRoom = currentLocation[direction];

      if (nextRoom !== 'wall') {
        this.player.location = nextRoom;
        this.logHistory('you have entered' + this.player.location);
        return;
      }
      this.logHistory('you hit the wall');
    }
  };

  this.logHistory = function() {
    this.history.push({id: this.history.length, text:`${this.player.name}, {{info}}`});
  };
}
