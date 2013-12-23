
// webllio
$('input[name=query]').keypress(function (e) {
  if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
    var value = $('input[name=query]').val();
    $.ajax({
      type: 'post',
      url: 'http://capword.appspot.com/words/create',
      data: {
        "Name": value
      },
      success: function(data) {
        alert('success');
      }
    });
  }
});