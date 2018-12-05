
function Coplayer(inPlayer) {
  'use strict';
  if (window !== top) {
    return;
  }
  let id = 'we-coplayer';
  if (get(id)) {
    return;
  }
  /**
   * Common utilis
   */
  function getId(part) {
    return id + '-' + part;
  }

  function get(id) {
    return top.document.getElementById(id);
  }

  function create(tagName, parent, props) {
    let elem = document.createElement(tagName);
    for (let prop in props) {
      elem[prop] = props[prop];
    }
    if (parent) {
      parent.appendChild(elem);
    }
    return elem;
  }

  function on(elem, type, listener, noStop) {
    let prefixes = ['', 'webkit', 'moz'];
    let prefix = prefixes.find(prefix => elem['on' + prefix + type] !== undefined);
    elem.addEventListener(prefix + type, function (e) {
      listener.call(elem, e);
      if (!noStop) {
          e.preventDefault();
          e.stopPropagation();
      }
      return !!noStop;
    }, false);
  }

  function getTimeSeconds(timeStr) {
    const arr = timeStr.split(':').reverse();
    return (+arr[0] || 0) + (+arr[1] || 0) * 60 + (+arr[2] || 0) * 3600;
  }

  var player = inPlayer;
  var interval = null;

  function handlePlay(seekTime, playTime) {
    player.currentTime(seekTime);
    player.pause();
    interval = setInterval(function() {
      let d = new Date();
      if(!compareTime(d, playTime)) {
        console.log("play");
        player.play();
        clearInterval(interval);
      }
    }, 300);
  }

  function compareTime(now, inputTime) {
    const arr = inputTime.split(':');
    if(arr.length !== 3) {
      alert("开始播放的时间格式错误！请参考'1:20:01', '00:19:21', '00:00:38'输入！");
      return false;
    }
    const nowTimeString = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
    return getTimeSeconds(inputTime) >= getTimeSeconds(nowTimeString);
  }

  function isPlayTimeValid(playTime) {
    return compareTime(new Date(), playTime);
  }

  function initUi() {
    let main = create('article', document.body, {
      id: id,
      className: 'article-main'
    });
    let local = create('input', main, {
      id: getId('local'),
      type: 'text',
      placeholder: "输入视频播放时间，例如'1:20:01', '19:21', '38'"
    });
    on(local, 'click', () => {});
    let remote = create('input', main, {
      id: getId('remote'),
      type: 'text',
      placeholder: "输入希望视频开始播放的时间（当天），例如'22:00:00', '00:11:00'"
    });
    on(remote, 'click', () => {});
    let syncBtn = create('button', main, {
      id: getId('sync-btn'),
      innerHTML: 'sync'
    });
    on(syncBtn, 'click', () => {
      if (interval) {
        clearInterval(interval);
      }
      const seekTime = getTimeSeconds(local.value);
      if (seekTime > player.duration()) {
        alert('视频播放时间超出视频时长，请重新输入！');
        return;
      }
      const playTime = remote.value;
      if (!isPlayTimeValid(playTime)) {
        alert('当前时间已超过期望开始播放时间，请重新输入！');
        return;
      }
      if (seekTime && playTime) {
        handlePlay(seekTime, playTime);
      } else {
        alert('请输入视频播放时间与开始播放时间！');
      }
    });
  }
  initUi();
};