$(function() {
  chrome.runtime.onInstalled.addListener(function(){
    updateTrainSchedule();
  });

  chrome.runtime.onStartup.addListener(function(){
    updateTrainSchedule();
  });

  chrome.alarms.onAlarm.addListener(function(alarm) {
    if (alarm.name == "updateBadgeYellow") {
      chrome.browserAction.setBadgeBackgroundColor({"color": "#ffd900"});
    } else {
      updateTrainSchedule();
    }
  });

  var updateTrainSchedule = function() {
    var date = new Date();
    // 5分後に設定
    date.setMinutes(date.getMinutes()+5);
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
        'from': '日本橋',
        'tlatlon': '',
        'to': '千葉ニュータウン中央',
        'via': '',
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
        var bodyStart = data.search(/<body/);
        var bodyEnd = data.search(/<\/body>/) + 7;
        console.log(data.substring(bodyStart, bodyEnd));
        var h = $(data.substring(bodyStart, bodyEnd));
        var departure = h.find("span.route-departure");
        console.log(departure.html());
        var departureDate = departure.html();
        var displayDepartureTime = departureDate.substring(0, 2) + departureDate.substring(3, 5);
        chrome.browserAction.setBadgeText({"text": displayDepartureTime});
        chrome.browserAction.setBadgeBackgroundColor({"color": "#00b200"});

        var date = new Date();
        var nextTrainTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), departureDate.substring(0, 2), departureDate.substring(3, 5));
        console.log('---');
        console.log(nextTrainTime);
        var diffTime = (nextTrainTime - date)/1000;

        console.log(diffTime);
        if (diffTime > 600) {
          // 10分をきった場合
          chrome.alarms.create('updateBadgeYellow', { delayInMinutes: Math.floor((diffTime-600)/60) });
        } else {
          chrome.browserAction.setBadgeBackgroundColor({"color": "#ffd900"});
        }

        chrome.alarms.create('updateTrainSchedule', { delayInMinutes: Math.floor((diffTime-360)/60) });
      }
    })
  };
})