// wait for the DOM to finish loading
$(document).ready(function() {
    console.log("ready");

//this will select all the boxes
//instead of using $() all the time
//this var will already have it stored
var $allBoxes = $(".box");
//$('#topleft') && $('#topmid') && $('#topright') && $('#midleft') && $('#midmid') && $('#midright') && $('#botleft') && $('#botmid') && $('#botright') ;

//selects X as the first player
var turn = "X";


//this uses the var $theBox from earlier
//to reset all boxes
function reset() {
  $allBoxes.text("");
  $allBoxes.removeClass("X");
  $allBoxes.removeClass("O");

//and in the same functio
//resets back to player X
turn = "X";
}

//this will change to next player turn
function nextTurn() {
  if (turn === "X") {
    turn = "O";
  } else {
    turn = "X";
  }

}

//DETERMINE winner


//this function states that if the
//owner of all boxes is X then it will return X
//same with O
function winner($firstBox, $secondBox, $thirdBox) {
  var firstBoxOwner = $firstBox.text(),
      secondBoxOwner = $secondBox.text(),
      thirdBoxOwner = $thirdBox.text();

  if ((firstBoxOwner === secondBoxOwner) && (secondBoxOwner === thirdBoxOwner)){
    if (firstBoxOwner === "X") {
      return "X";
    } else if (firstBoxOwner === "O") {
      return "O";
    } else {
      return null;
    }
  }
}

function diagonalWinner() {
  var downSlope = winner( $("#topleft"), $("#midmid"), $("#botright") );
  var upSlope = winner( $("#botleft"), $("#midmid"), $("#topright") );
  return downSlope || upSlope;
}

function columnWinner() {
  var leftCol = winner( $("#topleft"), $("#midleft"), $("#botleft") );
  var midCol = winner( $("#topmid"), $("#midmid"), $("#botmid") );
  var rightCol = winner( $("#topright"), $("#midright"), $("#botright") );

  return leftCol || (midCol || rightCol);
}

function rowWinner() {
  var topRow = winner( $("#topleft"), $("#topmid"), $("#topright") );
  var midRow = winner( $("#leftmid"), $("#midmid"), $("#rightmid") );
  var botRow = winner( $("#botleft"), $("#botmid"), $("#botright") );

  return topRow || (midRow || botRow);
}

function getWinner() {
  return diagonalWinner() || (rowWinner() || columnWinner());
}

function boardHasEmptyBoxes() {
  // start by assuming no empty boxes
  var hasEmptyBoxes = false;
  // check if every box is empty
  for (var i=0; i<$allBoxes.length; i++){
    // as soon as an empty box is found, update hasEmptyBoxes
    if ($allBoxes.eq(i).text() === ''){
      hasEmptyBoxes = true;
    }
  }
  return hasEmptyBoxes;
}

//EVENT LISTENERS

$("#reset").on("click", function() {
  reset();
});

$allBoxes.on('click', function () {
  if ($(this).text() === "") {
    $(this).text(turn);
    $(this).addClass(turn);
  }
}

);

var champ = getWinner();
     if (champ) {
       alert("Player " + champ + " won!");
       reset();
     } else if (boardHasEmptyBoxes()) {
       nextTurn();
     } else {
       alert("Neither player won!");
       resetGame();
     }

});







// if (player) {
// $("div.col-xs-4").on("click", function() {
//   $(this).text("x");
// }
// else {
//   $("div.col-xs-4").on("click", function() {
//     $(this).text("o");
// }
//
//
// );

//})
