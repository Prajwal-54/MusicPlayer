const musicBox = document.querySelector('.music-cont');
const musicInfo = document.querySelector('.music-info');
const musicName = document.querySelector('#title');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.song-progress');
const audio = document.querySelector('#audio');
const thumbnail = document.querySelector('#cover');
const prevBtn = document.querySelector('#prev');
const playBtn = document.querySelector('#play');
const nextBtn = document.querySelector('#next');

//songs list
const songs=['Blinding Lights','Chhote Chhote Peg','Dil Chori','High Heels','Love Dose','New Rules'];

//current song
let curSong=0;


//intially load song to DOM
loadSong(songs[curSong]);



function loadSong(song){

    musicName.innerText=song;
    audio.src=`music/${song}.mp3`;
    thumbnail.src=`thumbnail/${song}.jpg`;
    
}


function pauseSong(){
    musicBox.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();
}

function playSong(){
    musicBox.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

function updateProgress(e){
    const {duration,currentTime}=e.srcElement;
    const curProgress=(currentTime / duration) * 100;
    progress.style.width=`${curProgress}%`;
    
}

function setProgress(e){
    const width=this.clientWidth;
    const xval=e.offsetX;

    audio.currentTime=(xval / width) * audio.duration;
}


playBtn.addEventListener('click',()=>{
const isPlaying=musicBox.classList.contains('play');

if(isPlaying){
    pauseSong();
}
else{
    playSong();
}

});


prevBtn.addEventListener('click',()=>{
    if(curSong>0)
    curSong=(curSong-1)%songs.length;
    else 
    curSong=songs.length-1;
    loadSong(songs[curSong]);
    playSong();
});

nextBtn.addEventListener('click',()=>{
    curSong=(curSong+1)%songs.length;
    loadSong(songs[curSong]);
    playSong();
});





audio.addEventListener('timeupdate',updateProgress);

progressBar.addEventListener('click',setProgress);

audio.addEventListener('ended',()=>{
    curSong=(curSong+1)%songs.length;
    loadSong(songs[curSong]);
    playSong();
})