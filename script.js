const songName = document.querySelector(".song-name")
const bandName = document.querySelector(".band-name")
const cover = document.querySelector(".cover")
const song = document.getElementById("audio")
const play = document.getElementById("play")
const previous = document.getElementById("previous")
const next = document.getElementById("next")

songName.innerHTML = "Como um Anjo"
bandName.innerHTML = "Os Mennoti"
let isPlaying = false

const comoUmAnjo = {
    songName: "Como um Anjo",
    artist: "César Menotti & Fabiano",
    file: "como-um-anjo"
}

const anjos = {
    songName: "Anjos (Pra quem tem fé)",
    artist: "O Rappa",
    file: "anjos"
}

const playlist = [comoUmAnjo, anjos]
let index = 0

function playSong() {
    play.querySelector(".bi").classList = "bi bi-pause-circle-fill"
    song.play()
    isPlaying = true
}

function pauseSong() {
    play.querySelector(".bi").classList = "bi bi-play-circle-fill"
    song.pause()
    isPlaying = false
}

function playPauseDecider(){
    if(isPlaying === true)
        pauseSong()
    else
        playSong()
}

function initializeSong(){
    cover.src = `images/${playlist[index].file}.jpg`
    song.src = `songs/${playlist[index].file}.mp3`
    songName.innerHTML = playlist[index].songName
    bandName.innerHTML = playlist[index].artist
}

function previousSong(){
    if(index === 0)
        index = playlist.length-1
    else
        index -= 1
    initializeSong()
    playSong()
}

function nextSong(){
    if(index === playlist.length-1)
        index = 0
    else
        index += 1
    initializeSong()
    playSong()
}

initializeSong()

play.addEventListener("click", playPauseDecider)
previous.addEventListener("click", previousSong)
next.addEventListener("click", nextSong)


