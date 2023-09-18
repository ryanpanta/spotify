const songName = document.querySelector(".song-name")
const bandName = document.querySelector(".band-name")
const cover = document.querySelector(".cover")
const song = document.getElementById("audio")
const play = document.getElementById("play")
const previous = document.getElementById("previous")
const next = document.getElementById("next")
const currentProgress = document.querySelector(".current-progress")
const progressContainer = document.querySelector(".progress-container")
const shuffle = document.getElementById("shuffle")
const repeat = document.getElementById("repeat")
const songTime = document.getElementById("song-time")
const totalTime = document.getElementById("total-time")
const like = document.getElementById("like")

let isPlaying = false
let isShuffle = false
let repeatOn = false

const comoUmAnjo = {
    songName: "Como um Anjo",
    artist: "César Menotti & Fabiano",
    file: "como-um-anjo",
    liked: false
}

const anjos = {
    songName: "Anjos (Pra quem tem fé)",
    artist: "O Rappa",
    file: "anjos",
    liked: false
}

const existeUmLugar = {
    songName : "Mas Existe um Lugar - Remix",
    artist: "Cryzin, Manoel Gomes, Kaio Viana, Noemi Leal",
    file: "existe-um-lugar",
    liked: false
}

const originalPlaylist = JSON.parse(localStorage.getItem('playlist')) ?? [comoUmAnjo, anjos, existeUmLugar]
let sortedPlaylist = [...originalPlaylist]
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

function likeButtonRender(){
    if(sortedPlaylist[index].liked === true) {
        like.querySelector(".bi").classList = "bi bi-heart-fill"
        like.classList.add("button-active")
    } else {
        like.querySelector(".bi").classList = "bi bi-heart"
        like.classList.remove("button-active")
    }
}   


function initializeSong(){
    cover.src = `images/${sortedPlaylist[index].file}.jpg`
    song.src = `songs/${sortedPlaylist[index].file}.mp3`
    songName.innerHTML = sortedPlaylist[index].songName
    bandName.innerHTML = sortedPlaylist[index].artist
    likeButtonRender()
}

function previousSong(){
    if(index === 0)
        index = sortedPlaylist.length-1
    else
        index -= 1
    initializeSong()
    playSong()
}

function nextSong(){
    if(index === sortedPlaylist.length-1)
        index = 0
    else
        index += 1
    initializeSong()
    playSong()
}

function updateProgress(){
    const barWidth = (song.currentTime / song.duration) * 100
    currentProgress.style.setProperty("--progress", `${barWidth}%`)
    //currentProgress.style.width = `${barWidth}%`
    updateCurrentTime()
}

function jumpTo(event){
    const width = progressContainer.clientWidth
    const clickPosition = event.offsetX
    const jumpToTime = (clickPosition / width) * song.duration
    song.currentTime = jumpToTime
}   

function shuffleArray(preShuffleArray){
    let currentIndex = preShuffleArray.length - 1
    while(currentIndex > 0){
        let randomIndex = Math.floor(Math.random() * sortedPlaylist.length)
        let aux = preShuffleArray[currentIndex]
        preShuffleArray[currentIndex] = preShuffleArray[randomIndex]
        preShuffleArray[randomIndex] = aux
        currentIndex--;
    }
}

function shuffleButtonClicked(){
    if(isShuffle === false) {
        isShuffle = true
        shuffleArray(sortedPlaylist)
        shuffle.classList.add("button-active")
    }
    else{
        isShuffle = false
        sortedPlaylist = [...originalPlaylist]
        shuffle.classList.remove("button-active")
    }
}

function repeatButtonClicked(){
    if(repeatOn === false){
        repeatOn = true
        repeat.classList.add("button-active")
    }
    else {
        repeatOn = false
        repeat.classList.remove("button-active")
    }    
}

function nextOrRepeat(){
    if(repeatOn === false)
        nextSong()
    else
        playSong()
}

function toMMSS(originalNumber) {
    let hours = Math.floor(originalNumber / 3600)
    let min = Math.floor((originalNumber - hours * 3600) / 60)
    let secs = Math.floor(originalNumber - hours * 3600 - min * 60)
    
    return `${min.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`   
}

function updateCurrentTime(){
    songTime.innerHTML = toMMSS(song.currentTime)
}

function updateTotalTime(){
    totalTime.innerHTML = toMMSS(song.duration)
}

function likeButtonClicked(){
    if(sortedPlaylist[index].liked === false) {
        sortedPlaylist[index].liked = true
    } else {
        sortedPlaylist[index].liked = false
    }
    likeButtonRender()
    localStorage.setItem('playlist', JSON.stringify(originalPlaylist));

}

initializeSong()


play.addEventListener("click", playPauseDecider)
previous.addEventListener("click", previousSong)
next.addEventListener("click", nextSong)
song.addEventListener("timeupdate", updateProgress)
song.addEventListener("ended", nextOrRepeat)
song.addEventListener("loadedmetadata", updateTotalTime) 
progressContainer.addEventListener("click", jumpTo)
shuffle.addEventListener("click", shuffleButtonClicked)
repeat.addEventListener("click", repeatButtonClicked)
like.addEventListener("click", likeButtonClicked)


