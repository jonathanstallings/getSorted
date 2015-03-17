//Goal: Create visualizations for insertion sort and in-place shuffle algorithms.

var $display = $("#display");
var $controls = $("#controls fieldset");
var $controlButtons = $("#controls button");

function Block (column) {
  //Constructor for blocks of increasing height.
  this.itemHeight = "height" + column;
  this.toHTML = function () {
    var element = '<div class="blockFrame hidden faded" data-number=' + column +'><div class="blockItem ';
    element += this.itemHeight + '"';
    element += ">" + column + "</div></div>";
    return element;
  };
}

function Grid (blocks) {
  //Constructor for grid with given number of blocks.
  for (var i = 1; i <= blocks; i++) {
    var block = new Block(i);
    $display.append(block.toHTML());
  }
}

function selectBlock (block) {
  //Select a DOM block.
  return $display.children().eq(block-1);
}

function raiseBlock (block) {
  //Raise a block.
  var $thisBlock = selectBlock(block);

  if ($thisBlock.hasClass("lowered")) {
    $thisBlock.toggleClass("lowered");
  } else {
    $thisBlock.toggleClass("raised");
  }
  return $thisBlock;
}

function lowerBlock (block) {
  //Lower a block.
  var $thisBlock = selectBlock(block);

  if ($thisBlock.hasClass("raised")) {
    $thisBlock.toggleClass("raised");
  } else {
    $thisBlock.toggleClass("lowered");
  }
  return $thisBlock;
}

function fadeBlock (block) {
  //Fade out a block.
  var $thisBlock = selectBlock(block);

  $thisBlock.addClass("faded");
  return $thisBlock;
}

function hideBlock (block) {
  //Hide a block, keeping element placement.
  var $thisBlock = selectBlock(block);

  $thisBlock.addClass("hidden");
  return $thisBlock;
}

function showBlock (block) {
  //Unfade and unhide a block.
  var $thisBlock = selectBlock(block);

  $thisBlock.removeClass("faded hidden");
}

function fadeGrid () {
  //Fade out the grid.
  $display.children().addClass("faded");
}

function hideGrid () {
  //Hide the grid, keeping element placement.
  $display.children().addClass("hidden");
}

function showGrid () {
  //Unfade and unhide the grid.
  $display.children().removeClass("faded hidden");
}

function flourishGrid () {
  //Present the grid with a flourish.
  showGrid();
  $display.children().addClass("expanded");
}

function shiftBlock (block, units) { //This animation style is currently unused, but fun to play with.
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

function exchangeBlocks (first, second, style) {
  //Exchange two blocks with simple animation, optionally restricted for small displays.
  showBlock(first);
  showBlock(second);
  if (style == "full") {
    lowerBlock(first);
    raiseBlock(second);
  }
  setTimeout(swapBlocks, 300, first, second);
  if (style == "full") {
    setTimeout(lowerBlock, 450, second);
    setTimeout(raiseBlock, 450, first);
  }
  setTimeout(fadeBlock, 750, second);
  setTimeout(fadeBlock, 750, first);
}

function shuffleBlocks (m, style) {
  //Shuffle all blocks with simple animation, optionally restricted for small displays.
  var rand = Math.floor(Math.random() * m--);

  if (rand != m) { //random choice is not last block
    exchangeBlocks(rand + 1, m + 1, style); //do animation
    if (m) {
      setTimeout(shuffleBlocks, 900, m, style);
    } else {
      showGrid();
      enableControls();
    }
  } else { //else skip animation time
    if (m) {
      shuffleBlocks(m, style);
    } else {
      showGrid();
      enableControls();
    }
  }
}

function insertionSort (m) {
  //Perform insertion sort with no animation.
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

function insertionSortAnimated (i, m, style) {
  //Perform insertion sort with simple animation, optionally restricted for small displays.
  var temp, j;
  temp = selectBlock(i).data("number");

  var innerLoop = function (i, j, m, temp, style) {
    // body...
    if (j>1 && selectBlock(j-1).data("number") > temp) {
      exchangeBlocks(j-1, j, style);
      j--;
      if (j>0) {
        setTimeout(innerLoop, 900, i, j, m, temp, style);
      } else {
        setTimeout(insertionSortAnimated, 900, ++i, m, style);
      }
    } else {
      insertionSortAnimated(++i, m, style);
    }
  };

  if (i<=m) {
    j=i;
    innerLoop(i, j, m, temp, style);
  } else {
    showGrid();
    enableControls();
  }
}

function disableControls () {
  //Disable control buttons.
  $controlButtons.attr("disabled", "disabled");
  $controls.addClass("faded");
}

function enableControls () {
  //Enable control buttons.
  $controlButtons.removeAttr("disabled");
  $controls.removeClass("faded");
}

/*************************
On DOM Load
**************************/

$(function () {
  //Create and display the blocks.
  var grid = new Grid(10);
  setTimeout(flourishGrid, 400);
});

/*************************
Event Listeners
**************************/

$("#shuffleButton").on("click", function (e) {
  e.preventDefault();
  fadeGrid();
  disableControls();
  if (window.innerWidth <= 900) {
    shuffleBlocks($(".blockFrame").length, "mobile");
  } else {
    shuffleBlocks($(".blockFrame").length, "full");
  }
});

$("#sortButton").on("click", function (e) {
  e.preventDefault();
  disableControls();
  if (window.innerWidth <= 900) {
    insertionSortAnimated(2, $(".blockFrame").length, "mobile");
  } else {
    insertionSortAnimated(2, $(".blockFrame").length, "full");
  }
});

$("#resetButton").on("click", function (e) {
  e.preventDefault();
  $display.children().remove();
  grid = new Grid(10);
  setTimeout(flourishGrid, 400);
});

$("#navbar-toggle").on("click", function (e) {
  e.preventDefault();
  $("nav.navbar-collapse").toggleClass("collapse");
});
