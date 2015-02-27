
$display = $("#display");

function Block (column) {
  this.itemHeight = "height" + column;
  this.toHTML = function () {
    var element = '<div class="blockFrame"><div class="blockItem ';
    element += this.itemHeight + '"';
    element += ">" + column + "</div></div>";
    return element;
  };
}

function Grid (columns) {
  this.blocks = [];

  for (var i = 1; i <= columns; i++) {
    var block = new Block(i);
    $display.append(block.toHTML());
  }
}

function selectBlock (block) {
  //selects a DOM block
  return $display.children().eq(block-1);
}

function swap (first, second) {
  //swap two blocks
  selectBlock(second)
    .after(selectBlock(first))
    .insertBefore(selectBlock(first));
}

function raiseBlock (block) {
  //raise a block
  var $thisBlock = selectBlock(block);

  if ($thisBlock.hasClass("lowered")) {
    $thisBlock.toggleClass("lowered");
  } else {
    $thisBlock.toggleClass("raised");
  }
}

function lowerBlock (block) {
  //raise a block
  var $thisBlock = selectBlock(block);

  if ($thisBlock.hasClass("raised")) {
    $thisBlock.toggleClass("raised");
  } else {
    $thisBlock.toggleClass("lowered");
  }
}

function toggleNudge (block, direction) { //refactor with toggleRaise
  //push a direction
  selectBlock(block).toggleClass(direction);
  return selectBlock(block);
}

function pushBlock (block, units) { //refactor with toggleRaise
  //push a direction
  var offset = 'shift';

  if (units < 0) {
    offset += "Left";
  } else {
    offset += "Right";
  }
  offset += Math.abs(units);
  selectBlock(block)
    // .toggleClass("showTransitions")
    .toggleClass(offset)
    .prev().toggleClass("rightSideGap");

  return selectBlock(block);
}

function toggleHidden (block) {
  //toggles a fade
  selectBlock(block).toggleClass("hidden");
  return selectBlock(block);
}

function exchange (first, second) { //fine tune this
  //exchange two blocks with animation
  raiseBlock(second);
  toggleNudge(second, "left");
  toggleNudge(first, "right");
  setTimeout(swap, 800, first, second);
  setTimeout(toggleNudge, 1000, second, "right");
  setTimeout(toggleNudge, 1000, first, "left");
  setTimeout(raiseBlock, 1000, first);
}

function exchange (first, second) { //fine tune this
  //exchange two blocks with animation
  raiseBlock(second);
  lowerBlock(first);
  // toggleNudge(second, "left");
  pushBlock(second, -3);
  // toggleNudge(first, "right");
  pushBlock(first, 3);
  setTimeout(swap, 800, first, second);
  // setTimeout(toggleNudge, 1000, second, "right");
  setTimeout(pushBlock, 1000, second, 3);
  // setTimeout(toggleNudge, 1000, first, "left");
  setTimeout(pushBlock, 1000, first, -3);
  setTimeout(raiseBlock, 1000, first);
  setTimeout(lowerBlock, 1000, second);
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

