'use strict';

describe('testing GameController', function() {
  beforeEach(() => {
    angular.mock.module('gameApp');
    angular.mock.inject(($controller) => {
      this.gameCtrl = $controller('GameController');
    });
  });

  beforeEach(() => {
    this.gameCtrl.history = [];
    this.gameCtrl.player = {
      name: 'slug',
      location: 'roomD',
    };
  });

  it('player should change locations', () => {
    this.gameCtrl.moveDirection('east');
    expect(this.gameCtrl.player.location).toBe('roomB');
  });
});
