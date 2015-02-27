
$display = $("#display");

function Block (column) {
  this.itemHeight = "height" + column;
  this.toHTML = function () {
    var element = '<div class="blockFrame"><div class="blockItem ';
    element += this.itemHeight + '"';
    element += ">" + column + "</div></div>"
    return element;
  };
}

function Grid (columns) {
  this.blocks = [];

  for (var i = 1; i <= columns; i++) {
    var block = new Block(i);
    $display.append(block.toHTML())
  }
}

function swap (first, second) {
  //swap two blocks
  $display.children().eq(second-1)
    .after($display.children().eq(first-1))
    .insertBefore($display.children().eq(first-1));
}

function toggleRaise (block) {
  //raise a block
  $display.children().eq(block - 1).toggleClass("raised");
}

function togglePush (block, direction) { //refactor with toggleRaise
  //push a direction
  $display.children().eq(block -1).toggleClass(direction);
}

function toggleFade (block) {
  //toggles a fade
  $display.children().eq(block-1).toggleClass("hidden");
}

function exchange (first, second) { //fine tune this
  //exchange two blocks with animation
  toggleRaise(second);
  togglePush(second, "left");
  togglePush(first, "right")
  setTimeout(swap, 800, first, second);
  setTimeout(togglePush, 1000, second, "right");
  setTimeout(togglePush, 1000, first, "left");
  setTimeout(toggleRaise, 1000, first);
}

function doIt () {
  //test 
  exchange(9,10);
  setTimeout(exchange, 2000, 8, 9);
}

var grid = new Grid(10);

// var shuffle = function(m) {
//   var rand, $rand;
//   rand = Math.floor(Math.random() * m--);
//   $('li:eq(' + m + ')').
//     after($('li:eq(' + rand + ')')).
//     insertBefore($('li:eq(' + rand + ')'));
//   if(m) {
//     setTimeout(shuffle, 100, m);
//   }
// };

