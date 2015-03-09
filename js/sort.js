
$display = $("#display");

function Block (column) {
  this.itemHeight = "height" + column;
  this.toHTML = function () {
    var element = '<div class="blockFrame" data-number=' + column +'><div class="blockItem ';
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

  $thisBlock.addClass("faded");
  return $thisBlock;
}

function hideBlock (block) {
  //Hides a block, keeping element placement.
  var $thisBlock = selectBlock(block);

  $thisBlock.toggleClass("hidden");
  return $thisBlock;
}

function showBlock (block) {
  //Unfades or unhides a block
  var $thisBlock = selectBlock(block);

  $thisBlock.removeClass("faded hidden");
}

function fadeGrid () {
  //Toggles faded state of grid.
  $display.children().addClass("faded");
}

function showGrid () {
  //Toggles faded state of grid.
  $display.children().removeClass("faded");
}

function shiftBlock (block, units) {
  //Shift block left or right.
  var $thisBlock = selectBlock(block);
  var offset = 'shift';
  var lastOffset = $thisBlock.data("offset");

  if (lastOffset) { //If already offset, remove previous offset.
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
  showBlock(first);
  showBlock(second);
  lowerBlock(first);
  raiseBlock(second);
  setTimeout(swapBlocks, 400, first, second);
  setTimeout(lowerBlock, 600, second);
  setTimeout(raiseBlock, 600, first);
  setTimeout(fadeBlock, 1000, second);
  setTimeout(fadeBlock, 1000, first);
}

function shuffleBlocks (m) {
  //shuffle all blocks.
  var rand = Math.floor(Math.random() * m--);

  if (rand != m) { //random choice is not last block
    exchangeBlocks(rand + 1, m + 1); //do animation
    if (m) {
      setTimeout(shuffleBlocks, 1200, m);
    } else {
      showGrid();
    }
  } else { //else skip animation time
    if (m) {
      shuffleBlocks(m);
    } else {
      showGrid();
    }
  }
}

function insertionSort (m) {
  //Perform insertion sort.
  var $temp, i, j;

  for (i = 2; i <= m; i++) {
    $temp = selectBlock(i);

    j=i;
    while (j > 1 && selectBlock(j-1).data("number") > $temp.data("number")) {
      swapBlocks(j-1, j);
      j--;
    }
  }
}

function insertionSortAnimated (i, m) {
  //Perform insertion sort.
  var temp, j;
  temp = selectBlock(i).data("number");

  var innerLoop = function (i, j, m, temp) {
    // body...
    if (j>1 && selectBlock(j-1).data("number") > temp) {
      exchangeBlocks(j-1, j);
      j--;
      if (j>0) {
        setTimeout(innerLoop, 1200, i, j, m, temp);
      } else {
        setTimeout(insertionSortAnimated, 1200, ++i, m);
      }
    } else {
      insertionSortAnimated(++i, m);
    }
  };

  if (i<=m) {
    j=i;
    innerLoop(i, j, m, temp);
  } else {
    showGrid();
  }
}

var grid = new Grid(10);

/*************************
Event Listeners
**************************/

$("#shuffleButton").on("click", function (e) {
  e.preventDefault();
  fadeGrid();
  shuffleBlocks($(".blockFrame").length);
});

$("#sortButton").on("click", function (e) {
  e.preventDefault();
  insertionSortAnimated(2, $(".blockFrame").length);
});

$("#resetButton").on("click", function (e) {
  e.preventDefault();
  $display.children().remove();
  grid = new Grid(10);
});