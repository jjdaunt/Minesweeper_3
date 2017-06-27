var app = angular.module('minesweeper', []);

app.controller('minesweeperCtrl', function($scope) {
	// init
	$scope.playerCount = 8;
	$scope.setupPhase = 1;
	// p2
	$scope.setPlayerCount = function() {
		$scope.setupPhase = 2;
		$scope.players = [];
		for (var i = 0; i < $scope.playerCount; i++) {
			$scope.players.push({name: "", colour: null, value: null});
		}
	}
	// p3
	$scope.colourOptions = ["#FF0000", "#FFFF00", "#0066FF", "#059000", "#EE7600", "#800080", "#7CFF00", "#FFFFFF"];
	$scope.rounds = 8;
	$scope.setPlayers = function() {
		$scope.setupPhase = 3;
		$scope.colours = [];
		for (var i = 0; i < 4; i++) {
			$scope.colours.push({val: $scope.colourOptions[i], count: 0});
		}
	}
	$scope.selectColour = function(idx) {
		$scope.activeButton = idx;
	}
	$scope.pickColour = function(col) {
		if (!$scope.activeButton) return;
		$scope.colours[$scope.activeButton].val = col;
		$scope.activeButton = null;
	}
	$scope.addColour = function() {
		$scope.colours.push({val: "#FFFFFF", count: 0});
	}
	$scope.removeColour = function(idx) {
		$scope.colours.splice(idx, 1);
	}
	
	// end setup
	$scope.completeSetup = function() {
		$scope.setupPhase = 0;
		// It's like rounding, but bad!
		$scope.count = $scope.rounds * $scope.players.length / $scope.colours.length;
		$scope.intCount = parseInt($scope.count);
		if ($scope.intCount !== $scope.count) $scope.intCount++;
		for (var i = 0; i < $scope.colours.length; i++) {
			$scope.colours[i].count = angular.copy($scope.intCount);
		}
		$scope.nextRound();
	}
	
	// the game begins
	$scope.nextRound = function() {
		if ($scope.rounds === 0) $scope.endGame = true;
		else {
			$scope.setFirstPlayer();
			for (var i = 0; i < $scope.players.length; i++) {
				// select a roll and a colour for every player
				$scope.players[i].value = randInt(1,9);
				do {
					var c = $scope.colours[randInt(0,$scope.colours.length)];
				} while (c.count === 0);
				c.count--;
				$scope.players[i].colour = c.val;
			}
			$scope.rounds--;
		}
	}
	
	$scope.setFirstPlayer = function() {
		var min = 9;
		var list = [];
		for (var i = 0; i < $scope.players.length; i++) {
			if ($scope.players[i].value > min) continue;
			else if ($scope.players[i].value < min) {
				min = $scope.players[i].value;
				list = [];
			}
			list.push($scope.players[i]);
		}
		$scope.firstPlayer = list[randInt(0,list.length)];
	}
	
	
	// helpers
	function randInt(min, max) { // min inclusive, max exclusive
		return Math.floor(Math.random() * (max - min)) + min;
	}
	
});