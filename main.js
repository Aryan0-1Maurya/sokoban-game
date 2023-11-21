/* 

    #############################################################
      
          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

(   By ~Aryan Maurya Mr.perfect https://amsrportfolio.netlify.app  )

          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

    #############################################################

*/

var player = '<div class="player"></div>';
var crate = '<div class="crate"></div>';
var playerPos, cratePos, curCratePos, curPlayerPos, crateMoved;
window.onload = () => {
  Swal.fire({
    icon: "success",
    title: `
    😊 Welcome\n
    🎯 Aim of the game is to move the crates to the given points.\n
    ➡ You can move the crates by pushing it through the player.\n
    🎮 Use swipe controls, arrow buttons or in game controls.\n
    🐛 If you see any bug, mention it comments.
    `,
    showClass: {
      popup: `
 animate__animated
 animate__fadeInUp
 animate__faster
`,
    },
    hideClass: {
      popup: `
 animate__animated
 animate__fadeOutDown
 animate__faster
`,
    },
  });
  drawLevel(0);
  $(".info").hide();
  showLevels();

  /*Controls */
  document.addEventListener("swiped-left", function (e) {
    swipe(-1);
  });

  document.addEventListener("swiped-right", function (e) {
    swipe(1);
  });

  document.addEventListener("swiped-up", function (e) {
    swipe(-10);
  });

  document.addEventListener("swiped-down", function (e) {
    swipe(10);
  });

  $(document).on("keypress", "input", function (e) {
    if (e.which == 37) {
      swipe(-1);
    } else if (e.which == 38) {
      swipe(-10);
    } else if (e.which == 39) {
      swipe(1);
    } else if (e.which == 40) {
      swipe(10);
    }
  });
};

swipe = (direction) => {
  if ($(".info").css("display") == "none") {
    move(direction);
  }
};

/*Showing Levels List*/
showLevels = () => {
  $(".controls button").prop("disabled", true);
  var lvls = "";
  for (var i = 1; i <= 15; i++) {
    var j = i - 1;
    lvls += `
  <button class="shadow" onclick="selectLevel(${j})">${i}</button>
 `;
  }
  $(".info").html(`
 <div class="lvlBtns">
  <div>Select Level</div>
  ${lvls}
  <div style='background:transparent;color:white;'>Move the crates to marked locations to complete the level</div>
  </div>`);
  $(".info").fadeIn(500);
};

/*When Level Is Selected*/
selectLevel = (lvl) => {
  if (lvl == "next") {
    this.level++;
    lvl = this.level;
  } else if (lvl == "reset") {
    if (this.level == undefined) {
      this.level = 0;
    }
    lvl = this.level;
  }
  this.level = lvl;
  clearGame();
  $(".level").html("Level " + (this.level + 1));
  drawLevel(this.level);
  $(".info").hide();
  $(".controls button").prop("disabled", false);
};
/* 

    #############################################################
      
          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

(   By ~Aryan Maurya Mr.perfect https://amsrportfolio.netlify.app  )

          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

    #############################################################

*/
/*Drawing the level*/
drawLevel = (lvl) => {
  var level = levels[lvl];
  for (var i = 0; i <= 90; i++) {
    if (level[i] == ".") fill(i, "outside", "");
    else if (level[i] == "#") fill(i, "ground", '<div class="wall"></div>');
    else if (level[i] == " ") fill(i, "ground", "");
    else if (level[i] == "*") fill(i, "point", "");
    else if (level[i] == "@") fill(i, "ground", player);
    else if (level[i] == "£") fill(i, "ground", crate);
    else if (level[i] == "&") fill(i, "point", crate);
  }
};

fill = (id, className, content) => {
  $(".main").append(`<div id="${id}" class="${className}">${content}</div>`);
};

/*Clearing The Game*/

clearGame = () => $(".main").html('<div class="info"></div>');

/*Player Movement*/
move = (direction) => {
  var pos = $(".player").parent().attr("id");
  pos = parseInt(pos);
  dest = pos + direction;
  next = dest + direction;
  var destC = $("#" + dest).html();
  var nextC = $("#" + next).html();
  if (destC == "") {
    $("#" + dest).html(player);
    $("#" + pos).html("");
    crateMoved = false;
  } else if (destC == crate && nextC == "") {
    $("#" + dest).html(player);
    $("#" + next).html(crate);
    $("#" + pos).html("");
    playerPos = pos;
    cratePos = dest;
    curCratePos = next;
    crateMoved = true;
    check();
  }
};

undo = () => {
  if (crateMoved) {
    $("#" + curCratePos).html("");
    $("#" + cratePos).html(crate);
    $("#" + playerPos).html(player);
    crateMoved = false;
  }
};

/*Check if level is completed*/
check = () => {
  var completed = true;
  $(".point").each(function () {
    if ($(this).html() != crate) {
      completed = false;
    }
  });
  if (completed) {
    $(".info").html(`
      <div class="complete">
      <h1>Level Completed </h1>
      <br/>
      <button onclick="selectLevel('next')">Next</button>
      </div>
    `);
    $(".info").fadeIn(500);
    $(".controls button").prop("disabled", true);
  }
};

/* Show/Hide Controls */
showControls = () => {
  if ($(".controls").css("display") == "none") {
    $(".controls").css("display", "grid");
    $(".controlsbtn").html("Hide Controls");
  } else {
    $(".controls").hide();
    $(".controlsbtn").html("Show Controls");
  }
};

/*Levels List*/
var levels = [
  
  `
..###....
..#*#....
..#£####.
###@ £*#.
#* £ ###.
####£#...
...#*#...
...###...
.........
`,
  `
#####....
#  @#....
# ££#.###
# £ #.#*#
### ###*#
.##    *#
.#   #  #
.#   ####
.#####...
`,
  `
..####...
.##  #...
.# @£##..
.##£  #..
.## £ #..
.#*£  #..
.#**&*#..
.######..
.........
`,
  `
.####....
.#@ ###..
.# £  #..
### # ##.
#*# #  #.
#*£  # #.
#*   £ #.
########.
.........
`,
  `
.........
..######.
..#    #.
###£££ #.
#@ £** #.
# £***##.
####  #..
...####..
.........
`,
  `
.........
..#####..
###  @#..
#  £* ##.
#  *£* #.
### &£ #.
..#   ##.
..#####..
.........
`,
  `
..####...
..#**#...
.## *##..
.#  £*#..
## £  ##.
#  #££ #.
#  @   #.
########.
.........
`,
  `
.........
########.
#  #   #.
# £**£ #.
#@£*& ##.
# £**£ #.
#  #   #.
########.
.........
`,
  `
.........
######...
#    #...
# £££##..
#  #**###
##  **£ #
.#  @   #
.########
.........
`,
  `
.#######.
.#**£**#.
.#**#**#.
.# £££ #.
.#  £  #.
.# £££ #.
.#  #@ #.
.#######.
.........
`,
  `
.#####...
.# @ ###.
## #£  #.
# &* * #.
#  ££ ##.
### #*#..
..#   #..
..#####..
.........
`,
  `
.######..
.#    #..
.# £ @#..
.##&  #..
.# & ##..
.# & #...
.# & #...
.# * #...
.#####...
`,
  `
...####..
...#  #..
.###£ ##.
.#  & @#.
.#  &  #.
.#  & ##.
.###& #..
...#*##..
...###...
`,
  `
#####....
#   #####
# # #   #
# £   £ #
#**#£#£##
#*@£   #.
#**  ###.
######...
.........
`,
  `
.........
.######..
.#    ##.
##*##£ #.
# **£  #.
#  #£  #.
#  @ ###.
######...
.........
`,

`
..######..
..#    #..
.##@# ##..
.# £# #...
## #£ #...
# £££ ##..
## #  #...
..#####...
..........
`,
`
..#####..
..#  @##..
.## £# #..
.#  #  #..
## £# ##..
#  ££ #...
## #  ##..
..#####...
..........
`,
`
...###...
..##@##..
..# £ #..
###££ #..
# * * ##.
##££ £ #.
..#  #  #.
...#####..
..........
`,
`
...###...
..#####..
.##@###..
.# £ £ #.
###£££ #.
#* * * ##.
##£ ££  #.
..#  #   #.
...######..
`,
`
...###...
..#####..
..# @ #..
###£££ #..
# * * * ##.
## £ ££  #.
..#  #   #.
...######..
..........
`,
`
...#####...
..##@ ##...
..# £ #....
###£££ #...
#* * * ##..
## £ ££  #.
..#  #   #.
...######..
..........
`,
`
....###....
...#####...
..##@ ##...
..# £ #....
###£££ #...
#* * * ##..
## £ ££  #.
..#  #   #.
...######..
..........
`,
`
.....###.....
....#####....
...##@ ##....
...# £ #.....
####£££ #....
#* * * ##....
## £ ££  #...
..#  #   #...
...######....
..............
`,
`
.....###.....
....#####....
...##@ ##....
...# £ #.....
####£££ #....
#* * * ##....
## £ ££  #...
..#  #   #...
...######....
..............
`,
`
.....###.....
....#####....
...##@ ##....
...# £ #.....
####£££ #....
#* * * ##....
## £ ££  #...
..#  #   #...
...######....
..............
`,
`
.....###.....
....#####....
...##@ ##....
...# £ #.....
####£££ #....
#* * * ##....
## £ ££  #...
..#  #   #...
...######....
..............
`,
`
.....###.....
....#####....
...##@ ##....
...# £ #.....
####£££ #....
#* * * ##....
## £ ££  #...
..#  #   #...
...######....
..............
`,
`
.....###.....
....#####....
...##@ ##....
...# £ #.....
####£££ #....
#* * * ##....
## £ ££  #...
..#  #   #...
...######....
..............
`,
`
.....###.....
....#####....
...##@ ##....
...# £ #.....
####£££ #....
#* * * ##....
## £ ££  #...
..#  #   #...
...######....
..............
`,
`
.....###.....
....#####....
...##@ ##....
...# £ #.....
####£££ #....
#* * * ##....
## £ ££  #...
..#  #   #...
...######....
..............
`,
`
.....###.....
....#####....
...##@ ##....
...# £ #.....
####£££ #....
#* * * ##....
## £ ££  #...
..#  #   #...
...######....
..............
`,
];

/* 

    #############################################################
      
          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

(   By ~Aryan Maurya Mr.perfect https://amsrportfolio.netlify.app  )

          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

    #############################################################

*/
