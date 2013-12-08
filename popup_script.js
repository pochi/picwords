$(function() {
  $("p").html('Now loading...');

  var date = new Date();
  date.setMinutes(date.getMinutes() + 5);
  var month = date.getMonth() + 1;
  if(month<10) month = "0"+ month;
  var yearAndMonth = String(date.getFullYear()) + month;
  var day = date.getDate();
  if(day<10) day = "0"+ day;
  var hour = date.getHours();
  if(hour<10) hour = "0"+ hour;
  var minutes = String(date.getMinutes());
  var minute1;
  var minute2;

  if(minutes.length === 1) {
    minute1 = '0';
    minute2 = minutes[0];
  } else {
    minute1 = minutes[0];
    minute2 = minutes[1];
  }

  $.ajax({
    url: 'http://transit.loco.yahoo.co.jp/search/result',
    type: 'POST',
    data: {
      'flatlon': '',
      'from': '勝どき',
      'tlatlon': '',
      'to': '千葉ニュータウン中央',
      'via': '大門',
      'hb': '1',
      'expkind': '1',
      'ym': yearAndMonth,
      'd': day,
      'datepicker': '',
      'hh': hour,
      'm1': minute1,
      'm2': minute2,
      'type': '1',
      'ws': '2',
      's': '0',
      'x': '104',
      'y': '15',
      'kw': '千葉ニュータウン中央'
    },
    crossDomain: true,
    success: function(data, textStatus, xhr) {
      $("p").html(data);
    }
  })
});