'use strict';
/*
 * Tic Tac Toe - Human Player versus AI Opponent 
 * Originally created by Chris Hoskins (chris@polyfactory.com)
 * Created using Yeoman, Angular, Bootstrap
 */
angular.module('ticTacToeApp').controller('MainCtrl', ['$scope', function ($scope) {
    //Setting up the initial game board - this also is what draws the game board on the screen
    $scope.squares = [{'id':'0', 'val':'', 'win':false},{'id':'1', 'val':'', 'win':false},{'id':'2', 'val':'', 'win':false},{'id':'3', 'val':'', 'win':false},{'id':'4', 'val':'', 'win':false},{'id':'5', 'val':'', 'win':false},{'id':'6', 'val':'', 'win':false},{'id':'7', 'val':'', 'win':false},{'id':'8', 'val':'', 'win':false}];
    var moves = [];
    $scope.gameEnded = false;
    
    //Resets the game board if the user starts a new game
    $scope.beginNewGame = function() {
        
    };
    
    //Called whenever the user clicks on one of the game board squares to mark their current move and signal the AI to move
    $scope.playMove = function(index) {
        //Only lets the player move if the game hasn't ended yet
        if(!$scope.gameEnded) {
          //Only allows the human player to move in a non occupied spot  
          if(!$scope.squares[index].val) {
            //Sets the actual move for the human player
            $scope.squares[index].val = 'X';
            moves.push(index);
            //Checks if the AI won the game
            checkIfWon();
            //Computer will move
            aiMove();
          }
        }
      };
    
    //This function will check all 8 possible combinations of winning and report a winner
    function checkIfWon() {
        //Check top line win
        if($scope.squares[0].val && $scope.squares[0].val === $scope.squares[1].val && $scope.squares[0].val === $scope.squares[2].val) {
          console.log('"'+$scope.squares[0].val + '" wins on top horizontal line');
          $scope.squares[0].win = $scope.squares[1].win = $scope.squares[2].win = true;
          return;
        }
        //Check diagnol top left to bottom right win
        else if($scope.squares[0].val && $scope.squares[0].val === $scope.squares[4].val && $scope.squares[0].val === $scope.squares[8].val) {
          console.log('"'+$scope.squares[0].val + '" wins on diagnol down right');
          $scope.squares[0].win = $scope.squares[4].win = $scope.squares[8].win = true;
          return;
        }
        //Check left vertical line win
        else if($scope.squares[0].val && $scope.squares[0].val === $scope.squares[3].val && $scope.squares[0].val === $scope.squares[6].val) {
          console.log('"'+$scope.squares[0].val + '" wins on left vertical line');
          $scope.squares[0].win = $scope.squares[3].win = $scope.squares[6].win = true;
          return;
        }
        //Check middle vertical line win
        else if($scope.squares[1].val && $scope.squares[1].val === $scope.squares[4].val && $scope.squares[1].val === $scope.squares[7].val) {
          console.log('"'+$scope.squares[1].val + '" wins on  middle vertical line');
          $scope.squares[1].win = $scope.squares[4].win = $scope.squares[7].win = true;
          return;
        }
        //Check right vertical line win
        else if($scope.squares[2].val && $scope.squares[2].val === $scope.squares[5].val && $scope.squares[2].val === $scope.squares[8].val) {
          console.log('"'+$scope.squares[2].val + '" wins on  right vertical line');
          $scope.squares[2].win = $scope.squares[5].win = $scope.squares[8].win = true;
          return;
        }
        //Check diagnol bottom left to top right win
        else if($scope.squares[2].val && $scope.squares[2].val === $scope.squares[4].val && $scope.squares[2].val === $scope.squares[6].val) {
          console.log('"'+$scope.squares[2].val + '" wins on diagnol up right');
          $scope.squares[2].win = $scope.squares[4].win = $scope.squares[6].win = true;
          return;
        }
        //Check middle horizontal line win
        else if($scope.squares[3].val && $scope.squares[3].val === $scope.squares[4].val && $scope.squares[3].val === $scope.squares[5].val) {
          console.log('"'+$scope.squares[3].val + '" wins on middle horizontal line');
          $scope.squares[3].win = $scope.squares[4].win = $scope.squares[5].win = true;
          return;
        }
        //Check bottom horizontal line win
        else if($scope.squares[6].val && $scope.squares[6].val === $scope.squares[7].val && $scope.squares[6].val === $scope.squares[8].val) {
          console.log('"'+$scope.squares[6].val + '" wins on bottom horizontal line');
          $scope.squares[6].win = $scope.squares[7].win = $scope.squares[8].win = true;
          return;
        }
      }
    
    //Function used to determine the AI's next move
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
          ifAICanWin();
          if(!$scope.gameEnded) {
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
              //Blocking all 4 corners if necessary
              else if($scope.squares[1].val === 'X' && $scope.squares[5].val === 'X' && !$scope.squares[2].val) {
                aiMoveSet(2);
              }
              else if($scope.squares[1].val === 'X' && $scope.squares[3].val === 'X' && !$scope.squares[0].val) {
                aiMoveSet(0);
              }
              else if($scope.squares[3].val === 'X' && $scope.squares[7].val === 'X' && !$scope.squares[6].val) {
                aiMoveSet(6);
              }
              else if($scope.squares[5].val === 'X' && $scope.squares[7].val === 'X' && !$scope.squares[8].val) {
                aiMoveSet(8);
              }
              //Move were all blocked, move to next available space
              else {
                aiChooseAvailSpaceMiddleFirst();
              }
            }
            //If Players first move was the middle, now block or win
            else {
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
              //Account for the middle space also since the user has moved into that space
              else if($scope.squares[0].val === 'X' && $scope.squares[4].val === 'X' && !$scope.squares[8].val) {
                aiMoveSet(8);
              }
              else if($scope.squares[8].val === 'X' && $scope.squares[4].val === 'X' && !$scope.squares[0].val) {
                aiMoveSet(0);
              }
              else if($scope.squares[3].val === 'X' && $scope.squares[4].val === 'X' && !$scope.squares[5].val) {
                aiMoveSet(5);
              }
              else if($scope.squares[5].val === 'X' && $scope.squares[4].val === 'X' && !$scope.squares[3].val) {
                aiMoveSet(3);
              }
              else if($scope.squares[1].val === 'X' && $scope.squares[4].val === 'X' && !$scope.squares[7].val) {
                aiMoveSet(7);
              }
              else if($scope.squares[7].val === 'X' && $scope.squares[4].val === 'X' && !$scope.squares[1].val) {
                aiMoveSet(1);
              }
              //Move was blocked, move to next available space
              else {
                aiChooseAvailSpaceOther();
              }
            }
          }
        }
      }
    
    //Called when the AI cannot win, and does not need to block the human player from winning, and just needs to pick another space to move to
    function aiChooseAvailSpaceMiddleFirst() {
        var proceed = true;
        //Makes the AI stay away from the corners if they are not blocking or trying to win in the next round
        if(!$scope.squares[1].val) {
          aiMoveSet(1);
          return;
        }
        else if(!$scope.squares[3].val) {
          aiMoveSet(3);
          return;
        }
        else if(!$scope.squares[5].val) {
          aiMoveSet(5);
          return;
        }
        else if(!$scope.squares[7].val) {
          aiMoveSet(7);
          return;
        }
        //Cannot do a break in an Angular foreach, so must do it this way.  If game board size changes to large board size, this should be changed to native foreach
        angular.forEach($scope.squares, function(item) {
            if(!item.val && proceed) {
              aiMoveSet(item.id);
              proceed = false;
            }
          });
      }
    
    //Called when the AI cannot win, and does not need to block the human player from winning, and just needs to pick another space to move to
    function aiChooseAvailSpaceOther() {
        var proceed = true;
        //Makes the AI stay away from the corners if they are not blocking or trying to win in the next round
        if(!$scope.squares[0].val) {
          aiMoveSet(0);
          return;
        }
        //Cannot do a break in an Angular foreach, so must do it this way.  If game board size changes to large board size, this should be changed to native foreach
        angular.forEach($scope.squares, function(item) {
            if(!item.val && proceed) {
              aiMoveSet(item.id);
              proceed = false;
            }
          });
      }
      

    //Called to determine if the AI can win with the next move
    function ifAICanWin() {
        if($scope.squares[0].val === 'O' && $scope.squares[1].val === 'O' && !$scope.squares[2].val) {
          aiMoveSet(2);
          $scope.gameEnded = true;
        }
        else if($scope.squares[0].val === 'O' && $scope.squares[2].val === 'O' && !$scope.squares[1].val) {
          aiMoveSet(1);
          $scope.gameEnded = true;
        }
        else if($scope.squares[1].val === 'O' && $scope.squares[2].val === 'O' && !$scope.squares[0].val) {
          aiMoveSet(0);
          $scope.gameEnded = true;
        }
        else if($scope.squares[0].val === 'O' && $scope.squares[3].val === 'O' && !$scope.squares[6].val) {
          aiMoveSet(6);
          $scope.gameEnded = true;
        }
        else if($scope.squares[0].val === 'O' && $scope.squares[6].val === 'O' && !$scope.squares[3].val) {
          aiMoveSet(3);
          $scope.gameEnded = true;
        }
        else if($scope.squares[3].val === 'O' && $scope.squares[6].val === 'O' && !$scope.squares[0].val) {
          aiMoveSet(0);
          $scope.gameEnded = true;
        }
        else if($scope.squares[2].val === 'O' && $scope.squares[5].val === 'O' && !$scope.squares[8].val) {
          aiMoveSet(8);
          $scope.gameEnded = true;
        }
        else if($scope.squares[2].val === 'O' && $scope.squares[8].val === 'O' && !$scope.squares[5].val) {
          aiMoveSet(5);
          $scope.gameEnded = true;
        }
        else if($scope.squares[5].val === 'O' && $scope.squares[8].val === 'O' && !$scope.squares[2].val) {
          aiMoveSet(2);
          $scope.gameEnded = true;
        }
        else if($scope.squares[6].val === 'O' && $scope.squares[7].val === 'O' && !$scope.squares[8].val) {
          aiMoveSet(8);
          $scope.gameEnded = true;
        }
        else if($scope.squares[7].val === 'O' && $scope.squares[8].val === 'O' && !$scope.squares[6].val) {
          aiMoveSet(6);
          $scope.gameEnded = true;
        }
        else if($scope.squares[6].val === 'O' && $scope.squares[8].val === 'O' && !$scope.squares[7].val) {
          aiMoveSet(7);
          $scope.gameEnded = true;
        }
        else if($scope.squares[0].val === 'O' && $scope.squares[4].val === 'O' && !$scope.squares[8].val) {
          aiMoveSet(8);
          $scope.gameEnded = true;
        }
        else if($scope.squares[2].val === 'O' && $scope.squares[4].val === 'O' && !$scope.squares[6].val) {
          aiMoveSet(6);
          $scope.gameEnded = true;
        }
        else if($scope.squares[6].val === 'O' && $scope.squares[4].val === 'O' && !$scope.squares[2].val) {
          aiMoveSet(2);
          $scope.gameEnded = true;
        }
        else if($scope.squares[8].val === 'O' && $scope.squares[4].val === 'O' && !$scope.squares[0].val) {
          aiMoveSet(0);
          $scope.gameEnded = true;
        }
        else if($scope.squares[1].val === 'O' && $scope.squares[4].val === 'O' && !$scope.squares[7].val) {
          aiMoveSet(7);
          $scope.gameEnded = true;
        }
        else if($scope.squares[1].val === 'O' && $scope.squares[7].val === 'O' && !$scope.squares[4].val) {
          aiMoveSet(4);
          $scope.gameEnded = true;
        }
        else if($scope.squares[4].val === 'O' && $scope.squares[7].val === 'O' && !$scope.squares[1].val) {
          aiMoveSet(1);
          $scope.gameEnded = true;
        }
        else if($scope.squares[3].val === 'O' && $scope.squares[4].val === 'O' && !$scope.squares[5].val) {
          aiMoveSet(5);
          $scope.gameEnded = true;
        }
        else if($scope.squares[3].val === 'O' && $scope.squares[5].val === 'O' && !$scope.squares[4].val) {
          aiMoveSet(4);
          $scope.gameEnded = true;
        }
        else if($scope.squares[4].val === 'O' && $scope.squares[5].val === 'O' && !$scope.squares[3].val) {
          aiMoveSet(3);
          $scope.gameEnded = true;
        }
      }
      
    function aiMoveSet(index) {
        $scope.squares[index].val = 'O';
        moves.push(index);
        checkIfWon();
      }
               
  }]);
