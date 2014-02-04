
// var time = 0;
// var timer = function (action) {
//       var d = Date.now();
//       if (time < 1 || action === 'start') {
//           time = d;
//           return 0;
//       } else if (action === 'stop') {
//           var t = d - time;
//           time = 0;
//           return t;
//       } else {
//           return d - time;
//       }
//   };


// var update_player_position = function (player) {
//   $("#" + player + "_strip .active").next().addClass('active');
//   $("#" + player + "_strip .active").prev().removeClass('active');
// }

// $(document).ready(function() {
//   timer('start');
// //   if($("#player1_strip #second-box").css('active')) {
// //       $('#game-start').css('display','none');
// //   }

//   $(document).keyup(function(event) {
//     if(event.keyCode == 81){update_player_position("player1");}
//     if(event.keyCode == 80){update_player_position("player2");}
//     // Detect which key was pressed and call the appropriate function
//     // Google "jquery keyup what key was pressed" if you don't know how
//     if($("#player1_strip #second-box").hasClass("active")) {
//       $('#game-start').css('display','none');
//     }
//     if($("#player1_strip .last-box").hasClass("active")) {
//       $('#game-end').css('display','inline');
//       var timer_result = timer('stop');
//       console.log("Time was " + timer_result);
//       $.post("/end_game",{player:1, duration:timer_result}, function(results_page) {
//         console.log("This part is firing");
//         console.log(results_page);
//         window.location.href = results_page
//       });
//       $("td").removeClass("last-box");
//     } else if($("#player2_strip .last-box").hasClass("active")) {
//       $('#game-end').css('display','inline');
//       var timer_result = timer('stop');
//       console.log("Time was " + timer_result);
//       $.post("/end_game",{player:2, duration:timer_result}, function(results_page) {
//         console.log("This part is firing");
//         console.log(results_page);
//         window.location.href = results_page
//       });
//       $("td").removeClass("last-box");
//     }
//   });
// });


// ================================================ //

// $(document).ready(function() {
//   var player1 = new Player("jim");
//   var player2 = new Player("anne");

//   var game = new Game(player1, player2);

//   $(document).on('keyup', function(event) {
//     game.onKeyUp(event.which);
//   });
// });


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

  $(document).keyup(function(event) {
    if(event.keyCode == 81){update_player_position("player1");}
    if(event.keyCode == 80){update_player_position("player2");}
    // Detect which key was pressed and call the appropriate function
    // Google "jquery keyup what key was pressed" if you don't know how
    if($("#player1_strip #second-box").hasClass("active")) {
      $('#game-start').css('display','none');
    }
    if($("#player1_strip .last-box").hasClass("active")) {
      endGame(1);
    } else if($("#player2_strip .last-box").hasClass("active")) {
      endGame(2);
    }
  });
});

var endGame = function(player) {
  $('#game-end').css('display','inline');
  var timer_result = timer('stop');
  $.post("/end_game",{player:player, duration:timer_result}, function(results_page) {
    window.location.href = results_page;
  });
  $("td").removeClass("last-box");
};
