
// webllio
$('input[name=query]').keypress(function (e) {
  if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
    var value = $('input[name=query]').val();
    alert(value);
  }
});