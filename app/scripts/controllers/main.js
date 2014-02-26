'use strict';

angular.module('ticTacToeApp').controller('MainCtrl', ["$scope", function ($scope) {
    //Setting up the initial game board - this also is what draws the game board on the screen
    $scope.squares = [{'id':'0', 'val':''},{'id':'1', 'val':''},{'id':'2', 'val':''},{'id':'3', 'val':''},{'id':'4', 'val':''},{'id':'5', 'val':''},{'id':'6', 'val':''},{'id':'7', 'val':''},{'id':'8', 'val':''}];
    //Resets the game board if the user starts a new game
    $scope.beginNewGame = function() {
        console.log('new game started');
        $scope.squares = [{'id':'0', 'val':''},{'id':'1', 'val':''},{'id':'2', 'val':''},{'id':'3', 'val':''},{'id':'4', 'val':''},{'id':'5', 'val':''},{'id':'6', 'val':''},{'id':'7', 'val':''},{'id':'8', 'val':''}];
    };
    //Called whenever the user clicks on one of the game board squares to mark their current move
    $scope.playMove = function(index) {
        //Sets players move on the game board
        this.squareVal = 'X';
        //Sets the actual move in the game board object
        $scope.squares[index].val = "X";
        //Checks if the player won the game
        $scope.checkIfWon();
    };
    
    //This function will check all 8 possible combinations of winning and report a winner
    $scope.checkIfWon = function() {
        //Initial outer check prevents as much logic needing to be checked
        if($scope.squares[0].val) {
            //Check top line win
            if($scope.squares[0].val === $scope.squares[1].val && $scope.squares[0].val === $scope.squares[2].val) {
                console.log('"'+$scope.squares[0].val + '" wins on top horizontal line');
                return;
            }
            //Check diagnol top left to bottom right win
            else if($scope.squares[0].val === $scope.squares[4].val && $scope.squares[0].val === $scope.squares[8].val) {
                console.log('"'+$scope.squares[0].val + '" wins on diagnol down right');
                return;
            }
            //Check left vertical line win
            else if($scope.squares[0].val === $scope.squares[3].val && $scope.squares[0].val === $scope.squares[6].val) {
                console.log('"'+$scope.squares[0].val + '" wins on left vertical line');
                return;
            }
        }
        else if($scope.squares[1].val) {
            //Check middle vertical line win
            if($scope.squares[1].val === $scope.squares[4].val && $scope.squares[1].val === $scope.squares[7].val) {
                console.log('"'+$scope.squares[1].val + '" wins on  middle vertical line');
                return;
            }
        }
        else if($scope.squares[2].val) {
            //Check right vertical line win
            if($scope.squares[2].val === $scope.squares[5].val && $scope.squares[2].val === $scope.squares[8].val) {
                console.log('"'+$scope.squares[2].val + '" wins on  right vertical line');
                return;
            }
            //Check diagnol bottom left to top right win
            else if($scope.squares[2].val === $scope.squares[4].val && $scope.squares[2].val === $scope.squares[6].val) {
                console.log('"'+$scope.squares[2].val + '" wins on diagnol up right');
                return;
            }
        }
        else if($scope.squares[3].val) {
            //Check middle horizontal line win
            if($scope.squares[3].val === $scope.squares[4].val && $scope.squares[3].val === $scope.squares[5].val) {
                console.log('"'+$scope.squares[3].val + '" wins on middle horizontal line');
                return;
            }
        }
        else if($scope.squares[6].val) {
            //Check bottom horizontal line win
            if($scope.squares[6].val === $scope.squares[7].val && $scope.squares[6].val === $scope.squares[8].val) {
                console.log('"'+$scope.squares[6].val + '" wins on bottom horizontal line');
            }
        }
    };
    
}]);
