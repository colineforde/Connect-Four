$(document).ready(function(){
  $('#black').hide();
  $('#red').hide();
  window.game = new window.Game();
  var placePieceOnBoard = function(column){
      var placedPiece = game.placePiece(column);
       if (game.winner()){
          $('#game-status').html(game.winner() + " is the winner!");
          $(".place-token").prop("disabled", true)
        }
      return placedPiece
    };

    //https://jslinterrors.com/dont-make-functions-within-a-loop
    for (var i = 0; i < 7; i++ ) {
      (function(iCopy) {
        $('#columnButton' + i).on('click', function(){
          var currentPlayer = game.currentPlayer
          var placedPiece = placePieceOnBoard(iCopy);
          if(placedPiece) {
                $('#column' + iCopy).append('<img class="token" id="' + currentPlayer +'" src="pics/' + currentPlayer + '.gif"/>');
            }
            $(".token").animate({"margin-bottom": "3px"}, "slow")
          });
    }(i))
  }
  $('#restart').on('click', function(){
    $(".place-token").prop("disabled", true)
    $('.column').animate({height: "980px"}, "slow")
    $('.token').animate({opacity: 0}, "slow")
    setTimeout(function(){
      $('.token').remove()
      $('.column').animate({height: "480px"})
      $(".place-token").prop("disabled", false)
    }, 1000)
    window.game = new window.Game();
    $('#game-status').html("")
  })
});

