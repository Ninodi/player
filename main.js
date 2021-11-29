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


let trackIndex = 0
let counter = 0


let songs = [
    {
        img: "img/weekend.jpg",
        songName: "One Right Now",
        artist: "Post Malone, The Weekend",
        music: "music/One Right Now.mp3"
    },

    {
        img: "img/cas.jpg",
        songName: "Crush",
        artist: "Cigarettes After Sex",
        music: "music/Crush.mp3"
    },

    {
        img: "img/vansire.jpg",
        songName: "Nice To See You",
        artist: "Vansire",
        music: "music/Nice To See You.mp3"
    },

    {
        img: "img/videoclub.jpg",
        songName: "Mai",
        artist: "Videoclub",
        music: "music/Mai.mp3"
    },

    {
        img: "img/walters.jfif",
        songName: "I Love You So",
        artist: "The Walters",
        music: "music/I Love You So.mp3"
    },

    {
        img: "img/isaac.jpg",
        songName: "Silhouettes Of You",
        artist: "Isaac Gracie",
        music: "music/Silhouettes Of You.mp3"
    },

    {
        img: "img/gdefantom.jpg",
        songName: "Я тебя люблю",
        artist: "Где Фантом?",
        music: "music/Я тебя люблю.mp3"
    }
]


let colors = ["#ff9a9e", "#a18cd1", "#fbc2eb", "#f6d365", "#d4fc79", "#a8edea", "#cd9cf2", "#f794a4", "#ee9ca7", "#50cc7f", "#667eea", "#cd9cf2"]

let randomBackground = () => {
    let bgColor = colors[Math.floor(Math.random() * colors.length)]
    background.style.backgroundColor = bgColor
    player.style.backgroundColor = bgColor
}


shuffleBtn.addEventListener('click', () => {
    let random_index = Number.parseInt(Math.random() * songs.length);
    trackIndex = random_index;
    currTrack.src = songs[trackIndex].music
    playSong()
})

nowPlaying.innerText = `Playing ${trackIndex + 1} out of ${songs.length}`

let playSong = () => {
    console.log("jora")
    currTrack.src = songs[trackIndex].music
    img.src = songs[trackIndex].img
    songName.innerText = songs[trackIndex].songName
    artist.innerText = songs[trackIndex].artist
    nowPlaying.innerText = `Playing ${trackIndex + 1} out of ${songs.length}`

    currTrack.play();
}



playBtn.addEventListener('click', () => {
    imgContaier.classList.toggle("rotate")
    wave.classList.toggle('loader')

    if(document.querySelector(".playbtn i").classList.contains("pause")){
        playBtn.innerHTML = '<i class="fas fa-pause-circle play"></i>'
        currTrack.play();
    } else {
        playBtn.innerHTML = '<i class="fa fa-play-circle fa-5x pause"></i>'
        currTrack.pause()
    }
})

nextBtn.addEventListener('click', () => {
    counter++
    randomBackground()
    playBtn.innerHTML = '<i class="fas fa-pause-circle play"></i>'
    imgContaier.classList.add("rotate")
    wave.classList.add('loader')

    if(trackIndex < songs.length - 1){
        trackIndex += 1;
    } else if(counter % songs.length == 0){
        trackIndex = 0;
        counter = 0;
    }
    playSong()

    console.log(counter)
})

prevBtn.addEventListener('click', () => {
    counter--
    randomBackground()
    playBtn.innerHTML = '<i class="fas fa-pause-circle play"></i>'
    imgContaier.classList.add("rotate")
    wave.classList.add('loader')


    if(trackIndex > 0){
        trackIndex -= 1;
    } else if(counter < 0) {
        trackIndex = songs.length - 1
    }
    playSong()

    console.log(counter)
})

repeat.addEventListener("click", () => {
    let currIndex = trackIndex
    currTrack.src = songs[currIndex].music
    currTrack.play()
})


