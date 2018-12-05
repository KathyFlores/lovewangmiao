(function() {
  $.get("/api/video", function(data, status) {
    if(data.video_list) {
      let plist = data.video_list.map(item => {
        item.sources = [{
          src: item.url || '',
          type: 'video/mp4',
        }];
        item.poster = item.front || '';
        return item;
      });
      var options = {
        controls: true,
        autoplay: false,
        preload: 'metadata',
        playbackRates: [0.5, 1, 1.25, 1.5, 2],
        fill: true,
        controlBar: {
          volumePanel: {
            inline: false
          }
        },
        src: plist[0].url
      };
      var player = videojs('my-video', options);
      player.ready(function() {
        this.hotkeys({
          volumeStep: 0.1,
          seekStep: 5,
          enableModifiersForNumbers: false
        });
      })
      player.playlist(plist);
      player.playlistUi();
      let name = $('.vjs-playlist-item .vjs-playlist-now-playing .vjs-playlist-name').attr('title');
      player.addChild('TitleBar', {text: name});
      $('.vjs-playlist-item').click(function() {
        name = $(this).find('.vjs-playlist-name').attr('title');
        $('.vjs-title').html(name);
      });
    }
    
  });
})();