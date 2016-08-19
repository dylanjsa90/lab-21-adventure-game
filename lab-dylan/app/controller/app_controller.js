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
    options: ['fists', 'flee'],
  };
  this.activeEncounter = false;
  this.currentEncounter;
  this.nextMove;
  this.map = require('../lib/map.js');
  this.encounter = require('../lib/encounter.js');

  this.moveDirection = function(direction) {
    $log.debug('gameCtrl.moveDirection');
    if (this.map[this.player.location]) {
      let randomEncounter;
      let currentLocation = this.map[this.player.location];
      $log.log('currentLocation', currentLocation);
      this.nextMove = currentLocation[direction];
      if (currentLocation !== 'entrance' && this.nextMove !== 'deadend' && this.nextMove !== 'entrance') {
        this.map[this.nextMove]['back'] = currentLocation;
      }
      $log.log('nextMove', this.nextMove);

      if (this.nextMove !== 'deadend') {
        this.player.location = this.nextMove;
        if (this.map[this.player.location].explored === true) {
          this.logHistory('You have entered ' + this.player.location + ', this cave has already been searched');
          return;
        }
        if(this.player.location !== 'entrance' && this.map[this.player.location].explored === false) {
          randomEncounter = this.map[this.player.location].opts[getRandom(0, 4)];
          $log.log('random Encounter', randomEncounter);
          this.logHistory('you have entered ' + this.player.location + ', you have found a ' + randomEncounter + ' in the cave.');
        }

        if(randomEncounter === 'monster') {
          this.activeEncounter = true;
          let monsterIndex = getRandom(0, 3);
          this.currentEncounter = this.encounter.monster[monsterIndex];

        }

        if(randomEncounter === 'chest') {
          let chestIndex = getRandom(0, 3);
          let loot = this.encounter.chest[chestIndex];
          this.logHistory('you found ' + loot + 'in the chest');
          this.player.options.push(loot);
          return;
        }

        if(randomEncounter === 'food') {
          this.logHistory('you enjoyed the meal and gained 5 health');
          this.player.health += 5;
          return;
        }
      }

      if(this.nextMove === 'deadend') {
        this.player.health -= 5;
        this.logHistory('you hit a wall and lost 5 health');
      }
    }
  };

  this.logHistory = function() {
    this.history.push({id: this.history.length, text:`${this.player.name}, ${info}`});
  };

  this.attack = function(options) {
    if (options === 'flee') {
      this.player.location = this.map[this.player.location].back;
      this.activeEncounter = false;
      this.logHistory('you fled from ' + this.currentEncounter + ' and returned to ' + this.player.location);
    }
  };
}


function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
