let nowPlaying = document.querySelector(".nowPlaying")
let img = document.querySelector(".img")
let songName = document.querySelector(".name")
let artist = document.querySelector(".artist")

let playBtn = document.querySelector(".playbtn")
let prevBtn = document.querySelector(".prevbtn")
let nextBtn = document.querySelector(".nextbtn")
let shuffleBtn = document.querySelector(".shuffle")
let currTrack = document.createElement('audio')
let repeat = document.querySelector('.repeat')

let imgContaier = document.querySelector(".imgWrapper")
let wave = document.querySelector("#wave")
let background = document.querySelector(".playerBack")
let player = document.querySelector(".player")

let trackSlider = document.querySelector(".trackSlider")
let volumeSlider = document.querySelector(".volumeSlider")
let currTime = document.querySelector('.currentTime');
let totalDuration = document.querySelector('.totalDuration');

let muteBtn = document.querySelector(".fa-volume-off")

let trackIndex = 0
let counter = 0
let updateTimer

let songs = [
    {
        img: "img/weekend.jpg",
        songName: "One Right Now",
        artist: "Post Malone, The Weekend",
        music: "music/One Right Now.mp3",
    },

    {
        img: "img/cas.jpg",
        songName: "Crush",
        artist: "Cigarettes After Sex",
        music: "music/Crush.mp3",
    },

    {
        img: "img/vansire.jpg",
        songName: "Nice To See You",
        artist: "Vansire",
        music: "music/Nice To See You.mp3",
    },

    {
        img: "img/videoclub.jpg",
        songName: "Mai",
        artist: "Videoclub",
        music: "music/Mai.mp3",
    },

    {
        img: "img/walters.jfif",
        songName: "I Love You So",
        artist: "The Walters",
        music: "music/I Love You So.mp3",
    },

    {
        img: "img/isaac.jpg",
        songName: "Silhouettes Of You",
        artist: "Isaac Gracie",
        music: "music/Silhouettes Of You.mp3",
    },

    {
        img: "img/gdefantom.jpg",
        songName: "Я тебя люблю",
        artist: "Где Фантом?",
        music: "music/Я тебя люблю.mp3",
    }
]


let colors = ["#ff9a9e", "#a18cd1", "#fbc2eb", "#f6d365", "#d4fc79", "#a8edea", "#cd9cf2", "#f794a4", "#ee9ca7", "#50cc7f", "#667eea", "#cd9cf2"]

let randomBackground = () => {
    let bgColor = colors[Math.floor(Math.random() * colors.length)]
    background.style.backgroundColor = bgColor
    player.style.backgroundColor = bgColor
}


shuffleBtn.addEventListener('click', () => {
    randomBackground()
    let random_index = Number.parseInt(Math.random() * songs.length);
    counter = random_index
    trackIndex = random_index
    currTrack.src = songs[trackIndex].music
    playSong()

    console.log("shuffle " + counter)
})

nowPlaying.innerText = `Playing ${trackIndex + 1} out of ${songs.length}`

let playSong = () => {
    currTrack.src = songs[trackIndex].music
    img.src = songs[trackIndex].img
    songName.innerText = songs[trackIndex].songName
    artist.innerText = songs[trackIndex].artist
    nowPlaying.innerText = `Playing ${trackIndex + 1} out of ${songs.length}`
    
    currTrack.play() 
    setUpdate()
    updateTimer = setInterval(setUpdate, 1000);
}


playBtn.addEventListener('click', () => {
    imgContaier.classList.toggle("rotate")
    wave.classList.toggle('loader')

    if(document.querySelector(".playbtn i").classList.contains("pause")){
        playBtn.innerHTML = '<i class="fas fa-pause-circle play"></i>'
        currTrack.play()
    } else {
        playBtn.innerHTML = '<i class="fa fa-play-circle fa-5x pause"></i>'
        currTrack.pause()
    }
})

let playNext = () => {
    if(trackIndex < songs.length - 1){
        trackIndex += 1
    } else if(counter % songs.length == 0){
        trackIndex = 0
        counter = 0
    }
    playSong()
}


let resetPlayer = () => {
    playBtn.innerHTML = '<i class="fas fa-pause-circle play"></i>'
    imgContaier.classList.add("rotate")
    wave.classList.add('loader')
}


nextBtn.addEventListener('click', () => {
    counter++
    randomBackground()
    resetPlayer()
    playNext()
    console.log("next " + counter)
})


prevBtn.addEventListener('click', () => {
    counter--
    randomBackground()
    resetPlayer()


    if(trackIndex > 0){
        trackIndex -= 1;
    } else if(counter < 0) {
        trackIndex = songs.length - 1
    }
    playSong()

    console.log("prev " + counter)
})


repeat.addEventListener("click", () => {
    resetPlayer()
    let currIndex = trackIndex
    currTrack.src = songs[currIndex].music
    currTrack.play()
    console.log("repeat " + counter)
})


trackSlider.addEventListener('change', () => {
    let seekto = currTrack.duration * (trackSlider.value / 100)
    currTrack.currentTime = seekto
})

volumeSlider.value = 100

volumeSlider.addEventListener('change', () => {
    currTrack.volume = volumeSlider.value / 100
})


let setUpdate = () => {
    let seekPosition = 0;
    if(!isNaN(currTrack.duration)){
        seekPosition = currTrack.currentTime * (100 / currTrack.duration);
        trackSlider.value = seekPosition;

        let currentMinutes = Math.floor(currTrack.currentTime / 60);
        let currentSeconds = Math.floor(currTrack.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(currTrack.duration / 60);
        let durationSeconds = Math.floor(currTrack.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        currTime.innerHTML = currentMinutes + ":" + currentSeconds;
        totalDuration.innerHTML = durationMinutes + ":" + durationMinutes;

        if(trackSlider.value == 100) playNext()

        
    }
}



muteBtn.addEventListener('click', () => {
    muteBtn.classList.toggle('muted')

    if(muteBtn.classList.contains('muted')){
        currTrack.volume = 0
        volumeSlider.value = 0
    } else {
        currTrack.volume = 1
        volumeSlider.value = 100
    }
})
