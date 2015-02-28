
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
  //Select a DOM block
  return $display.children().eq(block-1);
}

function raiseBlock (block) {
  //Raise a block
  var $thisBlock = selectBlock(block);

  if ($thisBlock.hasClass("lowered")) {
    $thisBlock.toggleClass("lowered");
  } else {
    $thisBlock.toggleClass("raised");
  }
  return $thisBlock;
}

function lowerBlock (block) {
  //Lower a block
  var $thisBlock = selectBlock(block);

  if ($thisBlock.hasClass("raised")) {
    $thisBlock.toggleClass("raised");
  } else {
    $thisBlock.toggleClass("lowered");
  }
  return $thisBlock;
}

function fadeBlock (block) {
  //Fades out a block
  var $thisBlock = selectBlock(block);

  $thisBlock.toggleClass("faded");
  return $thisBlock;
}

function hideBlock (block) {
  //Hides a block, keeping element placement.
  var $thisBlock = selectBlock(block);

  $thisBlock.toggleClass("hidden");
  return $thisBlock;
}

function toggleNudge (block, direction) { //refactor with toggleRaise
  //Push a block a small distance.
  selectBlock(block).toggleClass(direction);
  return selectBlock(block);
}

function shiftBlock (block, units) { //refactor with toggleRaise
  //Shift block left or right.
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

function swapBlocks (first, second) {
  //Swap two blocks.
  selectBlock(second)
    .after(selectBlock(first))
    .insertBefore(selectBlock(first));
}

function exchangeBlocks (first, second) {
  //Exchange two blocks with simple animation.
  lowerBlock(first);
  raiseBlock(second);
  setTimeout(swapBlocks, 600, first, second);
  setTimeout(lowerBlock, 800, second);
  setTimeout(raiseBlock, 800, first);
}

function doIt () {
  //Test
  exchangeBlocks(9,10);
  setTimeout(exchangeBlocks, 1600, 8, 9);
  setTimeout(exchangeBlocks, 3200, 7, 8);
  setTimeout(exchangeBlocks, 4800, 6, 7);
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

function shuffleBlocks (m) {
  //shuffle all blocks.
  var rand = Math.floor(Math.random() * m--);

  if (rand != m) { //random choice is not last block
    exchangeBlocks(rand + 1, m + 1); //do animation
    if (m) {
      setTimeout(shuffleBlocks, 2000, m);
    }
  } else { //else skip animation time
    if (m) {
      shuffleBlocks(m);
    }
  }
}

  /*************************
  Event Listeners
  **************************/
  $("#shuffleButton").on("click", function () {
    shuffleBlocks($(".blockFrame").length);
  });