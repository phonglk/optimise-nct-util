function bml(){
  function bindCssRemoveGif() {
    const ss = document.styleSheets[document.styleSheets.length - 1];
    ss.insertRule(`.column2 .list-item-music li.cur .no_stt,
    ul.list_song_in_album li.active span.nunberit {
        background: none !important;
        position: relative;
    }`, ss.cssRules && ss.cssRules.length || 0);
    ss.insertRule(`.column2 .list-item-music li.cur .no_stt::after,
    ul.list_song_in_album li.active span.nunberit::after {
        content: '♫';
        position: absolute;
        top: 11px;
        left: 10px;
        color: white;
        font-size: 20px;
        text-indent: 1px;
    }`, ss.cssRules && ss.cssRules.length || 0);
    ss.insertRule(`.box-item-in-playlist ul.list_song_in_album li.active span.nunberit::after {
        top: 1px;
        left: 4px;
        color: black;
        text-indent: -5px;
    }`, ss.cssRules && ss.cssRules.length || 0);
  }
  function rebindProcessBuffering() {
    player.nctPlayerMp3.streamingMp3.processBuffering = function () {
      try {
        var current = document.getElementById("mp3" + this.pe).currentTime;
        if (__data[this.pe].curMp3Item.played) {
          if (current <= __data[this.pe].curMp3Item.currentTime && (isNaN(document.getElementById("mp3" + this.pe).duration) || __data[this.pe].curMp3Item.currentTime <= document.getElementById("mp3" + this.pe).duration - 3 && current > 1)) {
            __data[this.pe].curMp3Item.tempBuffer++;
            $("#mp3" + this.pe).trigger("bufferingMp3");
            if (__data[this.pe].curMp3Item.tempBuffer > 20) {
              this.checkReloadTime++;
              if (this.checkReloadTime <= 3) {
                if (current > 0) {
                  __data[this.pe].curMp3Item.reloadTime = current;
                }
                this.renSource(__data[this.pe].curMp3Item);
                this.loadStream();
                $("#mp3" + this.pe).trigger("playMp3");
              } else {
                $("#playerMp3" + this.pe).append(__renderMp3.renderErrorNotification(this.pe, __language.errorNetwork));
              }
            }
          } else {
            // $("#mp3" + this.pe).trigger("bufferedMp3");
            __data[this.pe].curMp3Item.tempBuffer = 0;
            this.checkReloadTime = 0;
            $("#errorNotification" + this.pe).remove();
          }
        }
        __data[this.pe].curMp3Item.currentTime = current;
      } catch (e) {
        console.log(e);
      }
    }
  }

  function bindRemoveTimeRefresh() {
    const $audio = document.querySelector('audio[id^=mp3]');
    function removeTimeParam() {
      $audio.src = $audio.src.replace(/\?t=\d+/, '');
      $audio.play();
    }
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && /\?t=\d+/.test($audio.src) === true) {
          removeTimeParam();
        }
      });
    });
    const config = { attributes: true, childList: false, characterData: false };
    removeTimeParam();
    observer.observe($audio, config);
  }

  if (location.pathname.match(/^\/user\//) !== null)  {
    $._data($(`#mp3${player.pe}`)[0], 'events').timeupdate[0].handler = () => {};
    $._data($(`#mp3${player.pe}`)[0], 'events').progress[0].handler = () => {};
    $._data($(`#mp3${player.pe}`)[0], 'events').durationchange[0].handler = () => {};

    const _p = document.getElementById(`mp3${player.pe}`);
    const $timeSliderHolder = document.getElementById(`timeSliderHolder${player.pe}`);
    const $timeSliderCurrent = document.getElementById(`timeSliderCurrent${player.pe}`);
    const $timeSliderBuffer = document.getElementById(`timeSliderBuffer${player.pe}`);
    const $utCurrentTime = document.getElementById(`utCurrentTime${player.pe}`);

    document.getElementById('loading').style.display = 'none';
    bindCssRemoveGif();

    setInterval(() => {
      // playing progress
      const {
        currentTime,
        duration,
        buffered
      } = _p;
      if (__data[player.pe].startScrollTime == false) {
        const percent = `${~~(currentTime / duration * 1000) / 10}%`;
        $timeSliderHolder.style.left = percent;
        $timeSliderCurrent.style.width = percent;
      }
      $utCurrentTime.innerHTML = putils.formatTime(currentTime);
      // buffering progress
      const bufferedTime = buffered && buffered.length ? buffered.end(0) : duration;
      const percentBuffered = `${~~(bufferedTime / duration * 100)}%`;
      $timeSliderBuffer.style.width = percentBuffered;
    }, 1000);

    rebindProcessBuffering();
  } else if (location.pathname.match(/^\/(bai-hat|playlist)\//)) {
    clearInterval(__data.flashPlayer.curMp3Item.timelyricInterval);
    const loaders = document.querySelectorAll('.loader-inner');
    for(let i = 0; i < loaders.length; i++) {
      loaders[i].style.display = 'none';
    }
    rebindProcessBuffering();
    bindCssRemoveGif();
    bindRemoveTimeRefresh();
  }
  console.log('Injection OK');
}

script = document.createElement('script');
script.id = 'tmpScript';
script.appendChild(document.createTextNode(`(${bml.toString()})()`));
(document.body || document.head || document.documentElement).appendChild(script);