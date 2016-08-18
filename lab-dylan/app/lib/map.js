'use strict';

module.exports = {
  roomA: {
    north: 'wall',
    east: 'roomB',
    south: 'roomC',
    west: 'wall',
  },
  roomB: {
    north: 'wall',
    east: 'wall',
    south: 'roomD',
    west: 'roomA',
  },
  roomC: {
    north: 'roomA',
    east: 'roomD',
    south: 'wall',
    west: 'wall',
  },
  roomD: {
    north: 'roomB',
    east: 'wall',
    south: 'wall',
    west: 'roomC',
  }

};
