 $(function () {
   // body...
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
  var grid = new Grid(10);
 });

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

