'use strict';

module.exports = {
  entrance: {
    left: 'caveA',
    straight: 'caveB',
    right: 'caveC',
    back: 'outside',
  },
  caveA: {
    left: 'deadend',
    straight: 'deadend',
    right: 'caveB',
    back: 'entrance',
    opts: ['chest', 'monster', 'nothing', 'fresh cooked meal'],
    explored: false,
  },
  caveB: {
    left: 'caveA',
    straight: 'deadend',
    right: 'caveB',
    back: 'entrance',
    opts: ['chest', 'monster', 'empty', 'food'],
    explored: false,
  },
  caveC: {
    left: 'caveB',
    straight: 'deadend',
    right: 'deadend',
    back: 'entrance',
    opts: ['chest', 'monster', 'empty', 'food'],
    explored: false,
  }

};
