// getting all required elements
let playPauseBtn = document.getElementById('play-pause-btn');
let prevBtn = document.getElementById('prev-btn');
let nextBtn = document.getElementById('next-btn');
let songName = document.getElementById('song-name');
let artistName = document.getElementById('artist-name');
let posterImg = document.getElementById('poster');
let functionBtn = document.getElementById('function-btn');
let currentTimeField = document.getElementById('current-time');
let durationField = document.getElementById('duration');
// song progress bar elements
let progressBar = document.getElementById('progress');
let rangeStyle = document.querySelector('.range-style');
let rangeDot = document.querySelector('.dot');
// volume bar elements
let volumeBar = document.getElementById('volume-range');
let volumeStyle = document.querySelector('.volume-style');
let volumeDot = document.querySelector('.volume-dot');


let index = 0;
let audio = new Audio();

// loading song in DOM
const loadSong = function (index) {

    posterImg.src = `images/posters/${songs[index].songPoster}.webp`;
    songName.innerHTML = songs[index].songName;
    artistName.innerHTML = songs[index].artist;
    audio.src = `music/${songs[index].songSource}.mp3`;

};

// function of play and pause btn
const masterPlay = function () {

    loadSong(index);

    playPauseBtn.addEventListener('click', () => {


        if (playPauseBtn.classList.contains('bx-play')) {

            audio.play();
            playPauseBtn.classList.remove('bx-play');
            playPauseBtn.classList.add('bx-pause');

        }

        else {

            audio.pause();
            playPauseBtn.classList.remove('bx-pause');
            playPauseBtn.classList.add('bx-play');

        }

    });


}();

// function of next and previous btn
nextBtn.addEventListener('click', () => {

    if (index + 1 < songs.length)
        index++;
    else
        index = 0;


    loadSong(index);
    if (playPauseBtn.classList.contains('bx-pause')) {

        audio.play();
    }
    else {

        playPauseBtn.classList.add('bx-play');
        playPauseBtn.classList.remove('bx-pause');

    }


});

prevBtn.addEventListener('click', () => {

    if (index <= 0)
        index = songs.length - 1;
    else
        index--;

    loadSong(index);
    if (playPauseBtn.classList.contains('bx-pause')) {

        audio.play();
    }
    else {

        playPauseBtn.classList.add('bx-play');
        playPauseBtn.classList.remove('bx-pause');

    }


});

// function for time handling and updation in DOM
const loadTimes = function () {



    audio.addEventListener('timeupdate', () => {

        progressBar.value = Math.floor(audio.currentTime / audio.duration * 100);
        rangeStyle.style.width = `${progressBar.value}%`;
        rangeDot.style.left = `${progressBar.value}%`;

        let currentTimeSeconds = Math.floor(audio.currentTime % 60);
        let currentTimeMinutes = Math.floor(audio.currentTime / 60);

        if (currentTimeSeconds < 10)
            currentTimeField.innerHTML = `0${currentTimeMinutes}:0${currentTimeSeconds}`;

        else
            currentTimeField.innerHTML = `0${currentTimeMinutes}:${currentTimeSeconds}`;

        let durationSeconds = Math.floor(audio.duration % 60);
        let durationMinutes = Math.floor(audio.duration / 60);

        if (isNaN(durationSeconds) || isNaN(durationMinutes))
            durationField.innerHTML = `00:00`;

        else if (durationSeconds < 10)
            durationField.innerHTML = `0${durationMinutes}:0${durationSeconds}`;

        else
            durationField.innerHTML = `0${durationMinutes}:${durationSeconds}`;
 
        


    });


}();

// function to run when song ends
audio.addEventListener('ended', () => {

    // repeat and shuffle song condition
    if (functionBtn.className == "bx bx-repeat repeat active") {

        audio.currentTime = 0;
        audio.play();

    }

    else if (functionBtn.className == "bx bx-shuffle active") {

        index = Math.floor(Math.random() * songs.length);
        loadSong(index);
        audio.play();

    }

    // song ended conditions
    else if (index + 1 < songs.length) {

        index++;
        loadSong(index);
        audio.play();
        playPauseBtn.classList.remove('bx-play');
        playPauseBtn.classList.add('bx-pause');

    }
    else {

        index = 0;
        loadSong(index);
        audio.play();
        playPauseBtn.classList.remove('bx-play');
        playPauseBtn.classList.add('bx-pause');

    }


});

// function to seek 
progressBar.addEventListener('change', () => {

    audio.currentTime = progressBar.value * audio.duration / 100;

})

// function of repeat and shuffle
functionBtn.addEventListener('click', () => {

    if (functionBtn.className == "bx bx-repeat") {
        functionBtn.className = "bx bx-repeat repeat active";
    }

    else if (functionBtn.className == "bx bx-repeat repeat active") {
        functionBtn.className = "bx bx-shuffle active";
    }

    else {
        functionBtn.className = "bx bx-repeat";
    }



})

// function to increase or decrease volume 
volumeBar.addEventListener('change', () => {

    audio.volume = volumeBar.value / 100;

    volumeStyle.style.width = `${volumeBar.value}%`;

    volumeDot.style.left = `${volumeBar.value}%`;

})








