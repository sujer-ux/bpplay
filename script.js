const player = document.querySelector('.play-wrapp'),
      expBtn = player.querySelector('.exp-top'),
      miniPlayer = player.querySelector('.mini-player'),
      songImage = player.querySelector('.song-image'),
      songInfo = player.querySelector('.song-info');



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
            songImage.style.height = null;
        } else {
            songInfo.classList.remove('minimize');
        }
    }
    console.log(setH);
    window.requestAnimationFrame(step);
});