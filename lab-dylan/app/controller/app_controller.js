'use strict';

const angular = require('angular');
const gameApp = angular.module('gameApp');

gameApp.controller('GameController', ['$log', GameController]);

function GameController($log) {
  this.history = [ {id: 0, text: 'You found a cave, time to explore'}];

  this.directions = ['left', 'straight', 'right', 'back'];
  this.player = {
    name: 'Adventurer',
    location: 'entrance',
    health: 100,
    weapon: ['fists'],
  };

  this.map = require('../lib/map.js');
  this.encounter = require('../lib/encounter.js');

  this.moveDirection = function(direction) {
    $log.debug('gameCtrl.moveDirection');
    if (this.map[this.player.location]) {
      let randomEncounter;
      let currentLocation = this.map[this.player.location];
      $log.log('currentLocation', currentLocation);
      let nextMove = currentLocation[direction];
      if (currentLocation !== 'entrance' && nextMove !== 'deadend' && nextMove !== 'entrance') {
        nextMove.back = currentLocation;
      }
      $log.log('nextMove', nextMove);

      if (nextMove !== 'deadend') {
        this.player.location = nextMove;
        if (nextMove.explored === true) {
          this.logHistory('You have entered ' + this.player.location + ', this cave has already been searched');
          return;
        }
        if(nextMove !== 'entrance' && this.map[this.player.location].explored === false) {
          randomEncounter = this.map[this.player.location].opts[getRandom(0, 4)];
          this.logHistory('you have entered ' + this.player.location + ', you have found a ' + randomEncounter + ' in the cave.');
        }

        if(randomEncounter === 'monster') {
          let monsterIndex = getRandom(0, 3);
          let monster = this.encounter.monster[monsterIndex];

        }

        if(randomEncounter === 'chest') {
          let chestIndex = getRandom(0, 3);
          let loot = this.encounter.chest[chestIndex];
          this.logHistory('you found ' + loot + 'in the chest');
          return;
        }

        if(randomEncounter === 'food') {
          this.logHistory('you enjoyed the meal and gained 5 health');
          this.player.health += 5;
          return;
        }
      }
      this.player.health -= 5;
      this.logHistory('you hit a wall and lost 5 health');
    }
  };

  this.logHistory = function() {
    this.history.push({id: this.history.length, text:`${this.player.name}, {{info}}`});
  };
}


function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
