'use strict';

angular.module('ticTacToeApp').controller('MainCtrl', ['$scope', function ($scope) {
    //Setting up the initial game board - this also is what draws the game board on the screen
    $scope.squares = [{'id':'0', 'val':''},{'id':'1', 'val':''},{'id':'2', 'val':''},{'id':'3', 'val':''},{'id':'4', 'val':''},{'id':'5', 'val':''},{'id':'6', 'val':''},{'id':'7', 'val':''},{'id':'8', 'val':''}];
    var moves = [];
    //Resets the game board if the user starts a new game
    $scope.beginNewGame = function() {
        //console.log('new game started');
        //$scope.squares = [{'id':'0', 'val':''},{'id':'1', 'val':''},{'id':'2', 'val':''},{'id':'3', 'val':''},{'id':'4', 'val':''},{'id':'5', 'val':''},{'id':'6', 'val':''},{'id':'7', 'val':''},{'id':'8', 'val':''}];
    };
    //Called whenever the user clicks on one of the game board squares to mark their current move
    $scope.playMove = function(index) {
        //Sets the actual move in the game board object
        $scope.squares[index].val = 'X';
        moves.push(index);
        //Checks if the player won the game
        checkIfWon();
        aiMove();
        console.log(moves);
      };
    
    //This function will check all 8 possible combinations of winning and report a winner
    function checkIfWon() {
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
      }
       
    function aiMove() {
        if(moves.length === 1) {
          //If user moves to the middle on first move, move to bottom left
          if($scope.squares[4].val) {
            aiMoveSet(6);
          }
          //If user moves to a corner on first move, move to the middle
          else {
            aiMoveSet(4);
          }
        }
        else {
          //If AI's first move was the middle, now move to edges and block human player
          if($scope.squares[4].val === 'O') {
            if($scope.squares[0].val === 'X' && $scope.squares[1].val === 'X' && !$scope.squares[2].val) {
              aiMoveSet(2);
            }
            else if($scope.squares[0].val === 'X' && $scope.squares[2].val === 'X' && !$scope.squares[1].val) {
              aiMoveSet(1);
            }
            else if($scope.squares[1].val === 'X' && $scope.squares[2].val === 'X' && !$scope.squares[0].val) {
              aiMoveSet(0);
            }
            else if($scope.squares[0].val === 'X' && $scope.squares[3].val === 'X' && !$scope.squares[6].val) {
              aiMoveSet(6);
            }
            else if($scope.squares[0].val === 'X' && $scope.squares[6].val === 'X' && !$scope.squares[3].val) {
              aiMoveSet(3);
            }
            else if($scope.squares[3].val === 'X' && $scope.squares[6].val === 'X' && !$scope.squares[0].val) {
              aiMoveSet(0);
            }
            else if($scope.squares[2].val === 'X' && $scope.squares[5].val === 'X' && !$scope.squares[8].val) {
              aiMoveSet(8);
            }
            else if($scope.squares[2].val === 'X' && $scope.squares[8].val === 'X' && !$scope.squares[5].val) {
              aiMoveSet(5);
            }
            else if($scope.squares[5].val === 'X' && $scope.squares[8].val === 'X' && !$scope.squares[2].val) {
              aiMoveSet(2);
            }
            else if($scope.squares[6].val === 'X' && $scope.squares[7].val === 'X' && !$scope.squares[8].val) {
              aiMoveSet(8);
            }
            else if($scope.squares[7].val === 'X' && $scope.squares[8].val === 'X' && !$scope.squares[6].val) {
              aiMoveSet(6);
            }
            else if($scope.squares[6].val === 'X' && $scope.squares[8].val === 'X' && !$scope.squares[7].val) {
              aiMoveSet(7);
            }
            //Move was blocked, move to next available space
            else {
                    
            }
          }
        }
      }
    
    function aiMoveSet(index) {
        $scope.squares[index].val = 'O';
        moves.push(index);
        checkIfWon();
      }
    
    //Get minimum # in array
    Array.min = function(array) {
        return Math.min.apply(Math, array);
      };
    
  }]);
