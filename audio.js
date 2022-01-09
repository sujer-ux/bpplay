let base = {
    trackItem: [
        'Love Will Tear Apart',
        'Моя',
        'Крайности',
        'Твоего балкона свет!',
        'За углом',
        'Никотиновая доза',
        'Мутные пятна',
    ],
    trackArtst: [
        'Alicia Widar',
        'kameraxstyle',
        'Кладбище Черновиков',
        'Пупок Комсомола',
        'Пустецкий',
        'СуШ(07)',
        'nutakoe',
    ],
    image: [
        'https://sujer-ux.github.io/pb.su/image/03.jpg',
        'https://sujer-ux.github.io/pb.su/image/04.jpg',
        'https://sujer-ux.github.io/pb.su/image/05.jpg',
        'https://sujer-ux.github.io/pb.su/image/06.jpg',
        'https://sujer-ux.github.io/pb.su/image/sujer-ux.jpg',
        'https://sujer-ux.github.io/pb.su/image/sush07.jpg',
        'https://sujer-ux.github.io/pb.su/image/nutakoe_pyatna.jpg',
    ],
    song: [
        'https://sujer-ux.github.io/pb.su/songs/widar_love.mp3',
        'https://sujer-ux.github.io/pb.su/songs/kameraxstyle_moya.mp3',
        'https://sujer-ux.github.io/pb.su/songs/kch_krainosti.mp3',
        'https://sujer-ux.github.io/pb.su/songs/komsomola_svet.mp3',
        'https://sujer-ux.github.io/pb.su/songs/pustetskiy_uglom.mp3',
        'https://sujer-ux.github.io/pb.su/songs/sush_doza.mp3',
        'https://sujer-ux.github.io/pb.su/songs/nutakoe_pyatna.mp3',
    ],
};

const prevImg = document.querySelector('.prew-image-play').querySelector('img'),
      prevSongName = document.querySelector('.song-name'),
      prevSongArtist = document.querySelector('.artist-name'),
      img = document.querySelector('.song-image').querySelector('img'),
      songName = document.querySelector('.player-song-name'),
      songArtist = document.querySelector('.player-artist-name'),
      prewTimeBar = document.querySelector('.time-bar-prew'),
      current = document.querySelector('.current'),
      duration = document.querySelector('.duration'),
      timeBar = document.querySelector('.timeprogress'),
      roundRange = document.querySelector('.roundRange'),
      playBtn = document.querySelector('.play-main-controls'),
      nextBtn = document.querySelector('.next-main-controls'),
      prewBtn = document.querySelector('.prev-main-controls');
      
console.log(roundRange)

var SongID = 6;
let audio = new Audio(base.song[SongID]);
let played = false;
let moveTime = false;

audio.onended = function() {
    audioNext();
}

nextBtn.onclick = audioNext;
prewBtn.onclick = audioPrew;

function audioNext() {
    SongID = SongID + 1;
    if (SongID > base.trackItem.length - 1) {
        SongID = 0;
    }
    audio.src = base.song[SongID];
    playColl();
}

function audioPrew() {
    SongID = SongID - 1;
    if (SongID < 0) {
        SongID = base.trackItem.length - 1;
    }
    audio.src = base.song[SongID];
    playColl();
}


function playColl() {
    audio.play();
    playBtn.classList.add('played');
    played = true;
    prevImg.src = base.image[SongID];
    prevSongName.innerHTML = base.trackItem[SongID];
    prevSongArtist.innerHTML = base.trackArtst[SongID];
    img.src = base.image[SongID];
    songName.innerHTML = base.trackItem[SongID];
    songArtist.innerHTML = base.trackArtst[SongID];
    
}

function stop(elem) {
    elem.pause();
    elem.currentTime = 0;
}



function playPause() {
    playBtn.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            this.classList.add('played');
        } else {
            audio.pause();
            this.classList.remove('played');
        }
    });
    audio.addEventListener('ended', () => play.classList.remove('played'));
}
playPause();

audio.addEventListener('timeupdate', timeUpdate);
function timeUpdate() {
    prewTimeBar.style.width = (100 * this.currentTime) / this.duration + '%';
    current.innerHTML = formatted(this.currentTime);
}

function mediaRewind(elem, media) {
    let mainElem = elem.parentNode,
        offsX;
    
    audio.addEventListener('timeupdate', timeUpdate);
    
    
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        
        mainElem.addEventListener('touchstart', function(e) {
            hintMove(e);
            this.addEventListener('touchmove', hintMove);
            media.removeEventListener('timeupdate', timeUpdate);
        });

        mainElem.addEventListener('touchend', function(e) {
            this.removeEventListener('touchmove', hintMove);
            media.addEventListener('timeupdate', timeUpdate);
            setTime(e, this);
        });
        
    } else {
        mainElem.addEventListener('mousedown', function(e) {
            hintMove(e);
            document.addEventListener('mousemove', hintMove);
            media.removeEventListener('timeupdate', timeUpdate);
            body.classList.add('un-select');
            document.addEventListener('mouseup', mup);
            
            function mup(e) {
                document.removeEventListener('mousemove', hintMove);
                media.addEventListener('timeupdate', timeUpdate);
                body.classList.remove('un-select');
                setTime(e, mainElem);
                
                setTimeout(function() {
                    document.removeEventListener('mouseup', mup);

                }, 1);
            }
        });
    }
    
    function setTime(e, el) {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            offsX = e.changedTouches[0].pageX - mainElem.getBoundingClientRect().x;
        } else {
            offsX = e.pageX - mainElem.getBoundingClientRect().x;
        }
        media.currentTime = media.duration * offsX / el.offsetWidth;
    }
    function timeUpdate() {
        elem.style.width = (100 * this.currentTime) / this.duration + '%';
        roundRange.style.left = (100 * this.currentTime) / this.duration + '%';
        current.innerHTML = formatted(this.currentTime);
    }
    function hintMove(e) {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            offsX = e.changedTouches[0].pageX - mainElem.getBoundingClientRect().x;
        } else {
            offsX = e.pageX - mainElem.getBoundingClientRect().x;
        }
        let setW = (100 * offsX) / mainElem.offsetWidth;     
        setW = minMax(setW, 0, 100);
        elem.style.width = minMax(setW, 0, 100) + '%';
        roundRange.style.left = minMax(setW, 0, 100) + '%';
        
        function setPreCrnt(el) {
            let preCrnt = audio.duration * (offsX / el.offsetWidth);
            current.innerHTML = formatted(minMax(preCrnt, 0, audio.duration));
        }
        setPreCrnt(mainElem);
    }
    media.addEventListener('canplaythrough', () => duration.innerHTML = formatted(audio.duration));
}
mediaRewind(timeBar, audio);

function minMax(num, min, max) {
    if (num < min) {
        num = min;
    } else if (num > max) {
        num = max;
    }
    return num;
}

function formatted(input) {
    let timeStamp = input;
    let minutes = Math.floor(timeStamp / 60);
    let seconds = Math.floor(timeStamp % 60);
    let formatted = [
        minutes.toString().padStart (2, '0'),
        seconds.toString().padStart (2, '0')
    ].join(':');
    return formatted;
}

timeBar.onmouseover = function() {
    roundRange.classList.add('hoverRange');
    console.log('1');
}
