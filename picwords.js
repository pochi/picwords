$("input[name=query]").keypress(function(event) {
  if ((event.which && event.which === 13) || (event.keyCode && event.keyCode === 13)) {
    var value = $("input[name=query]").val();
    alert(value);
  }
});