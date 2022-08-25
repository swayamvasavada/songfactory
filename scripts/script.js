// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('./songs/1.mp3');
let masterPlay = document.getElementById('masterPlay')
let myProgressBar = document.getElementById('myProgressBar')
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songItemPlayBtn = Array.from(document.getElementsByClassName('songItemPlay'));
let nextSongBtn = document.getElementById('next');
let prevSongBtn = document.getElementById('prev');

let songs = [
    { songName: "Salam-e-Ishq", filePath: "song/1.mp3", coverPath: "./images/covers/1.jpg" },
    { songName: "Second-Salam-e-Ishq", filePath: "song/2.mp3", coverPath: "./images/covers/2.jpg" },
    { songName: "Third-Salam-e-Ishq", filePath: "song/3.mp3", coverPath: "./images/covers/3.jpg" },
    { songName: "Fourth - Salam-e-Ishq", filePath: "song/4.mp3", coverPath: "./images/covers/4.jpg" },
    { songName: "Fifth -Salam-e-Ishq", filePath: "song/5.mp3", coverPath: "./images/covers/5.jpg" },
    { songName: "Sixth - Salam-e-Ishq", filePath: "song/6.mp3", coverPath: "./images/covers/6.jpg" },
    { songName: "Seven - Salam-e-Ishq", filePath: "song/7.mp3", coverPath: "./images/covers/7.jpg" },
    { songName: "Eighth - Salam-e-Ishq", filePath: "song/8.mp3", coverPath: "./images/covers/8.jpg" },
    { songName: "Ninth - Salam-e-Ishq", filePath: "song/9.mp3", coverPath: "./images/covers/9.jpg" },
    { songName: "Tenth - Salam-e-Ishq", filePath: "song/9.mp3", coverPath: "./images/covers/10.jpg" },
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

function playAudio() {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
}

function progressBar() {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress
}

function seekBarUpdate() {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
}

function makeAllPlays() {
    songItemPlayBtn.forEach((element) => {
        element.classList.remove('fa-circle-pause')
        element.classList.add('fa-circle-play')
    })
}

songItemPlayBtn.forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        masterSongName.innerText = songs[songIndex].songName

        if (audioElement.currentTime <= 0) {
            audioElement.currentTime = 0
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src = `./songs/${songIndex + 1}.mp3`;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-circle-play')
            masterPlay.classList.add('fa-circle-pause')

        }

        else if (audioElement.paused) {
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src = `./songs/${songIndex + 1}.mp3`;
            audioElement.currentTime = played
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-circle-play')
            masterPlay.classList.add('fa-circle-pause')
        }

        else {
            audioElement.pause()
            played = audioElement.currentTime
            e.target.classList.remove('fa-circle-pause')
            e.target.classList.add('fa-circle-play')
            gif.style.opacity = 0;
            masterPlay.classList.remove('fa-circle-pause')
            masterPlay.classList.add('fa-circle-play')
        }
    })
})

function playNext() {
    if (songIndex >= 9) {
        songIndex = 0
    }
    else {
        songIndex += 1
    }
    audioElement.currentTime = 0
    audioElement.src = `./songs/${songIndex + 1}.mp3`;
    audioElement.play();
    masterSongName.innerText = songs[songIndex].songName
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause')
}

function playPrev() {
    if (songIndex <= 0) {
        songIndex = 9
    }
    else {
        songIndex -= 1
    }
    audioElement.currentTime = 0
    audioElement.src = `./songs/${songIndex + 1}.mp3`;
    audioElement.play();
    masterSongName.innerText = songs[songIndex].songName
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause')
}


masterPlay.addEventListener('click', playAudio)
audioElement.addEventListener('timeupdate', progressBar)
myProgressBar.addEventListener('change', seekBarUpdate)
nextSongBtn.addEventListener('click', playNext);
prevSongBtn.addEventListener('click', playPrev);
