
$div = $("#display");

function Block () {
  this.blockSize = blockSize;
}

var shuffle = function(m) {
  var rand, $rand;
  rand = Math.floor(Math.random() * m--);
  $('li:eq(' + m + ')').
    after($('li:eq(' + rand + ')')).
    insertBefore($('li:eq(' + rand + ')'));
  if(m) {
    setTimeout(shuffle, 100, m);
  }
};
var deck = new Deck();
shuffle($('.cards').length);