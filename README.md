Drag and drop this to your bookmark bar

[Optimise NCT](javascript: (function bml(){if(!(player&&player.pe)){alert('Something wrong ...');return!1}else{$._data($(`#mp3${player.pe}`)[0],'events').timeupdate[0].handler=()=>{};$._data($(`#mp3${player.pe}`)[0],'events').progress[0].handler=()=>{};$._data($(`#mp3${player.pe}`)[0],'events').durationchange[0].handler=()=>{};const _p=document.getElementById(`mp3${player.pe}`);const $timeSliderHolder=document.getElementById(`timeSliderHolder${player.pe}`);const $timeSliderCurrent=document.getElementById(`timeSliderCurrent${player.pe}`);const $timeSliderBuffer=document.getElementById(`timeSliderBuffer${player.pe}`);const $utCurrentTime=document.getElementById(`utCurrentTime${player.pe}`);document.getElementById('loading').style.display='none';const ss=document.styleSheets[document.styleSheets.length-1];ss.insertRule(`.column2 .list-item-music li.cur .no_stt {        background: none !important;        position: relative;    }`,ss.cssRules&&ss.cssRules.length||0);ss.insertRule(`.column2 .list-item-music li.cur .no_stt::after {        content: '%E2%99%AB';        position: absolute;        top: 11px;        left: 10px;        color: white;        font-size: 20px;        text-indent: 1px;    }`,ss.cssRules&&ss.cssRules.length||0);setInterval(()=>{const{currentTime,duration,buffered}=_p;if(__data[player.pe].startScrollTime==!1){const percent=`${~~(currentTime / duration * 1000) / 10}%`;$timeSliderHolder.style.left=percent;$timeSliderCurrent.style.width=percent}$utCurrentTime.innerHTML=putils.formatTime(currentTime);const bufferedTime=buffered&&buffered.length?buffered.end(0):duration;const percentBuffered=`${~~(bufferedTime / duration * 100)}%`;$timeSliderBuffer.style.width=percentBuffered},1000);player.nctPlayerMp3.streamingMp3.processBuffering=function(){try{var current=document.getElementById("mp3"+this.pe).currentTime;if(__data[this.pe].curMp3Item.played){if(current<=__data[this.pe].curMp3Item.currentTime&&(isNaN(document.getElementById("mp3"+this.pe).duration)||__data[this.pe].curMp3Item.currentTime<=document.getElementById("mp3"+this.pe).duration-3&&current>1)){__data[this.pe].curMp3Item.tempBuffer++;$("#mp3"+this.pe).trigger("bufferingMp3");if(__data[this.pe].curMp3Item.tempBuffer>20){this.checkReloadTime++;if(this.checkReloadTime<=3){if(current>0){__data[this.pe].curMp3Item.reloadTime=current}this.renSource(__data[this.pe].curMp3Item);this.loadStream();$("#mp3"+this.pe).trigger("playMp3")}else{$("#playerMp3"+this.pe).append(__renderMp3.renderErrorNotification(this.pe,__language.errorNetwork))}}}else{__data[this.pe].curMp3Item.tempBuffer=0;this.checkReloadTime=0;$("#errorNotification"+this.pe).remove()}}__data[this.pe].curMp3Item.currentTime=current}catch(e){console.log(e)}}}})() "Optimise NCT")

After NCT Player is loaded, just click the bookmark bar to optimise its player.

# What is NCT ?

Nhac Cua Tui is a popular free music service in Vietnam, its competitor such as Mp3 Zing, nhacso (died ?), ...

# What is the problem ?

NCT's app and web are shitty. Despite that their mobile apps are upraded, their Web App is still bad, the performance is worse than its competitor: Mp3 Zing. Playing music in background is CPU Consuming. 

Especially, If you are using a laptop, it will drain your battery like hell ... 
Because I had paid for the VIP member so I don't want to switch to Mp3 Zing (I will do after VIP Subscription is expired)

So I tried to optimise its player for my good.

* I am using Google Chrome, Other browser may do not have my problems

# Why it is CPU consuming ?

- Updating progress bar and play time is frequently
- Loading animation is still runing in background
- Some unecessary triggering (I think so)
- Gif is bad for Chrome

# What the script do ?

- Replace original progress handlers whit less frequent, optimised handler
- Add display:none to loader animation so browser don't have to render it
- Remove unused triggers
- Replace gif by music note unicode character

# What is the difference ?

On my machine, the CPU Usage is reduced by 4 times ! From ~10.0 to ~2.5. 
The test is taken with sandboxed environment where there is almost zero extensions.