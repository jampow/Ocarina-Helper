var notes = ['C','C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
var seq = {
  "_1":  [0,1,0,1],
  "_2":  [1,0,0,0],
  "_3":  [1,0,0,1],
  "_4":  [1,1,0,0],
  "_5":  [1,1,0,1],
  "_6":  [1,1,1,1],
  "_7":  [1,0,1,1],
  "_8":  [1,1,1,0],
  "_9":  [1,0,1,0],
  "_10": [0,1,1,1],
  "_11": [0,0,1,1],
  "_12": [0,1,1,0],
  "_13": [0,0,1,0],
  "_14": [0,0,0,1],
  "_15": [0,1,0,0],
  "_16": [0,0,0,0]
};

var mode = {
  //Ionian
  "i":  [-5, -4, -3, -2, -1, 0, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  //Dorian
  "d":  [-5, -4, -3, -2, -1, 0, 2, 3, 5, 6, 7, 8, 9, 10, 10, 12],
  //Phrygian
  "p":  [-5, -4, -3, -2, -1, 0, 1, 3, 5, 6, 7, 8, 8, 10, 10, 12],
  //Lydian
  "ly": [-5, -4, -3, -2, -1, 0, 2, 4, 6, 6, 7, 8, 9, 10, 11, 12],
  //Mixolydian
  "m":  [-5, -4, -3, -2, -1, 0, 2, 4, 5, 6, 7, 8, 9, 10, 10, 12],
  //Aeolian
  "a":  [-5, -4, -3, -2, -1, 0, 2, 3, 5, 6, 7, 9, 8, 10, 11, 12],
  //Locrian
  "lo": [-5, -4, -3, -2, -1, 0, 1, 3, 5, 6, 6, 8, 8, 10, 10, 12],
  //Zelderian
  "z":  [-5, 14, 15,  3, -1, 0, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12]
};

function getNote(scale, prop) {
  var sclIdx = $.inArray(scale, notes);//Scale Index
  var realProp = sclIdx + prop;
  var note;

  while (realProp < 0 || realProp > 11) {
    if (realProp < 0) {
      realProp = 12 + realProp;
    } else if (realProp > 11) {
      realProp = realProp - 12;
    }
  }

  note = notes[realProp];
  return note;
}

function showScale(){
  var scale     = $('#scale_container input:checked').val();
  var mode_sel  = $('#mode_container input:checked').val();
  var pattern   = eval('mode.'+mode_sel);
  var container = $('#container');

  container.text('');

  $.each(seq, function(idx, val){
    var v = idx.substr(1);
    var t = $('<div/>').addClass('note').attr('val', v);
    var schema = val;
    for (i = 0; i < 4; i++) {
      var sp = schema[i] == 1 ? $('<span/>').addClass('true') : $('<span/>');
      t.append(sp.addClass('finger'));
    }
    t.append($('<span/>').addClass('noteName').text(getNote(scale, pattern[v-1])));
    t.appendTo(container);
  });
}

$(function(){
//  $('#Ok').bind('click', showScale);

  $('.controls').buttonset()
  $('input[type=radio]').click(showScale);
});

