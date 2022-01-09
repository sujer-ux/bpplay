const player = document.querySelector('.play-wrapp'),
      expBtn = player.querySelector('.exp-top'),
      miniPlayer = player.querySelector('.mini-player'),
      songImage = player.querySelector('.song-image'),
      songInfo = player.querySelector('.song-info'),
      indexPlay = document.querySelector('.play-main'),
      playlist = player.querySelector('.mini-playlist');




indexPlay.addEventListener('click', function() {
    if (!player.classList.contains('player-active')) {
        player.classList.add('player-active');
        indexPlay.innerHTML = 'Stop';
        playColl();
    } else {
        player.classList.remove('player-active');
        player.classList.remove('expand');
        indexPlay.innerHTML = 'Play!';
        stop(audio);
    }
});

expBtn.onclick = expandPlayer;

function expandPlayer() {
    if (!player.classList.contains('expand')) {
        player.classList.add('expand');
    } else {
        player.classList.remove('expand');
    }
}

miniPlayer.addEventListener('scroll', function() {
    let eHeight = 350,
        scrollHeight = miniPlayer.scrollTop,
        setH = eHeight - scrollHeight;
    
    if (setH < 0) {
        setH = 0;
    }
    
    function step() {
        songImage.style.height = setH + 'px';
        if (setH < 55) {
            songInfo.classList.add('minimize');
            playlist.style.marginTop = 457 + 'px';
            songImage.style.height = null;
        } else {
            songInfo.classList.remove('minimize');
            playlist.style.marginTop = null;
        }
    }
    
    //157
    
    
    window.requestAnimationFrame(step);
});