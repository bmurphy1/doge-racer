
var time = 0;
var timer = function (action) {
      var d = Date.now();
      if (time < 1 || action === 'start') {
          time = d;
          return 0;
      } else if (action === 'stop') {
          var t = d - time;
          time = 0;
          return t;
      } else {
          return d - time;
      }
  };


var update_player_position = function (player) {
  $("#" + player + "_strip .active").next().addClass('active');
  $("#" + player + "_strip .active").prev().removeClass('active');
}

$(document).ready(function() {
  timer('start');
//   if($("#player1_strip #second-box").css('active')) {
//       $('#game-start').css('display','none');
//   }

  $(document).keyup(function(event) {
    if(event.keyCode == 81){update_player_position("player1");}
    if(event.keyCode == 80){update_player_position("player2");}
    // Detect which key was pressed and call the appropriate function
    // Google "jquery keyup what key was pressed" if you don't know how
    if($("#player1_strip #second-box").hasClass("active")) {
      $('#game-start').css('display','none');
    }
    if($("#player1_strip .last-box").hasClass("active")) {
      $('#game-end').css('display','inline');
      var result = timer('stop');
      console.log("Time was " + result);
      alert("Player one wins!");
      $("td").removeClass("last-box");
    } else if($("#player2_strip .last-box").hasClass("active")) {
      $('#game-end').css('display','inline');
      var result = timer('stop');
      console.log("Time was " + result);
      alert("Player two wins!");
      $("td").removeClass("last-box");
    }
  });
});
