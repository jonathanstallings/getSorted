
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

function raiseBlock (block) {
  //raise a block
  var $thisBlock = selectBlock(block);

  if ($thisBlock.hasClass("lowered")) {
    $thisBlock.toggleClass("lowered");
  } else {
    $thisBlock.toggleClass("raised");
  }
  return $thisBlock;
}

function lowerBlock (block) {
  //raise a block
  var $thisBlock = selectBlock(block);

  if ($thisBlock.hasClass("raised")) {
    $thisBlock.toggleClass("raised");
  } else {
    $thisBlock.toggleClass("lowered");
  }
  return $thisBlock;
}

function fadeBlock (block) {
  //fades out a block
  var $thisBlock = selectBlock(block);

  $thisBlock.toggleClass("faded");
  return $thisBlock;
}

function hideBlock (block) {
  //fades out a block
  var $thisBlock = selectBlock(block);

  $thisBlock.toggleClass("hidden");
  return $thisBlock;
}

function toggleNudge (block, direction) { //refactor with toggleRaise
  //push a direction
  selectBlock(block).toggleClass(direction);
  return selectBlock(block);
}

function shiftBlock (block, units) { //refactor with toggleRaise
  //shift block left or right
  var $thisBlock = selectBlock(block);
  var offset = 'shift';
  var lastOffset = $thisBlock.data("offset");

  //If already offset, remove previous offset.
  if (lastOffset) {
    $thisBlock
      .removeClass(lastOffset)
      .removeData("offset");
  }

  //Determine amount of offset and execute.
  if (units) {
    if (units < 0) {
      offset += "Left";
    } else {
      offset += "Right";
    }
    offset += Math.abs(units);
    $thisBlock
      .toggleClass(offset)
      .data("offset", offset);
      // .prev().toggleClass("rightSideGap");
  }

  return $thisBlock;
}

function swap (first, second) {
  //swap two blocks
  selectBlock(second)
    .after(selectBlock(first))
    .insertBefore(selectBlock(first));
}

function exchangeOld (first, second) { //fine tune this
  //exchange two blocks with animation
  lowerBlock(first);
  raiseBlock(second);
  // setTimeout(toggleNudge, 400, second, "left");
  // setTimeout(toggleNudge, 400, first, "right");
  setTimeout(swap, 600, first, second);
  // setTimeout(toggleNudge, 600, second, "right");
  // setTimeout(toggleNudge, 600, first, "left");
  setTimeout(lowerBlock, 800, second);
  setTimeout(raiseBlock, 800, first);
}

function exchange (first, second) { //fine tune this
  //exchange two blocks with animation

  raiseBlock(second);
  lowerBlock(first);
  // toggleNudge(second, "left");
  shiftBlock(second, -3);
  // toggleNudge(first, "right");
  shiftBlock(first, 3);
  setTimeout(swap, 800, first, second);
  // setTimeout(toggleNudge, 1000, second, "right");
  setTimeout(shiftBlock, 1000, second, 3);
  // setTimeout(toggleNudge, 1000, first, "left");
  setTimeout(shiftBlock, 1000, first, -3);
  setTimeout(raiseBlock, 1000, first);
  setTimeout(lowerBlock, 1000, second);
}

function doIt () {
  //test
  exchangeOld(9,10);
  setTimeout(exchangeOld, 1600, 8, 9);
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

