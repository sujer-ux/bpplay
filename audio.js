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

console.table(base);

const prevImg = document.querySelector('.prew-image-play').querySelector('img'),
      prevSongName = document.querySelector('.song-name'),
      prevSongArtist = document.querySelector('.artist-name'),
      img = document.querySelector('.song-image').querySelector('img'),
      songName = document.querySelector('.player-song-name'),
      songArtist = document.querySelector('.player-artist-name'),
      prewTimeBar = document.querySelector('.time-bar-prew'),
      timeBar = document.querySelector('.timeprogress'),
      nextBtn = document.querySelector('.next-main-controls'),
      prewBtn = document.querySelector('.prev-main-controls'),
      playBtn = document.querySelector('.play-main-controls');
      
      

var SongID = 6;
let audio = new Audio(base.song[SongID]);
let played = false;
let moveTime = false;

audio.onended = function() {
    audioNext();
}

nextBtn.onclick = audioNext;
prewBtn.onclick = audioPrew;
playBtn.onclick = playSong;

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

function playSong() {
    if (!played) {
        audio.play();
        playBtn.classList.add('played');
        played = true;
    } else if (played) {
        audio.pause();
        playBtn.classList.remove('played');
        played = false;
    }
}

function timeProgressUpdate(elem, elem2) {
    audio.ontimeupdate = progressUpdate;
    
    function progressUpdate() {
        let d = audio.duration;
        let c = audio.currentTime;
        elem.style.width = (100 * c) / d + '%';
        if (!moveTime) {
            elem2.style.width = (100 * c) / d + '%';
        }
    }
}

function audioRew() {
    let w,
        o;
    
    timeBar.parentNode.addEventListener('mousedown', function() {
        w = timeBar.parentNode.offsetWidth;
        o = event.offsetX;
        timeBar.parentNode.addEventListener('mousemove', () => {
            let percent = o / (w / 100);
            console.log(percent);
            timeBar.style.width = percent + '%';
        });
        moveTime = true;
    });
    timeBar.parentNode.addEventListener('mouseup', function() {
        audio.pause();
        audio.currentTime = audio.duration * o/w;
        if (played) {
            audio.play();
        }
        moveTime = false;
    });
}

audioRew();

timeProgressUpdate(prewTimeBar, timeBar);
