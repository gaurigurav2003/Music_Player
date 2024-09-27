const tracks = [
    {
        name: "Let me down slowly",
        artist: "Alec Benjamin",
        cover: "image/PA1.jpeg",
        source: "music/3.mp3",
    },
    {
        name: "Let me love you",
        artist: "DJ Snake/Justin Bieber",
        cover: "image/PA2.jpeg",
        source: "music/letme.mp3",
    },
    {
        name: "Perfect",
        artist: "Ed Sheeran",
        cover: "image/ek-villain.jpg",
        source: "music/teri.mp3",
    },
];

let currentTrackIndex = 0;
const trackCover = document.getElementById('track-cover'); 
const trackTitle = document.getElementById('track-title'); 
const trackArtist = document.getElementById('track-artist'); 
const audio = new Audio();
const progressBar = document.getElementById('progress-bar');
const currentTimeDisplay = document.getElementById('current-time');
const totalDurationDisplay = document.getElementById('total-duration');
const playButton = document.getElementById('play');
const nextButton = document.getElementById('next');
const previousButton = document.getElementById('previous');

// Function to load the selected track
function loadTrack(trackIndex) {
    const track = tracks[trackIndex];
    trackCover.src = track.cover;
    trackTitle.textContent = track.name;
    trackArtist.textContent = track.artist;
    audio.src = track.source;
    audio.load(); // Load the audio

    // Reset progress bar and time display
    progressBar.value = 0;
    currentTimeDisplay.textContent = "0:00";
    totalDurationDisplay.textContent = "0:00";

    // Update total duration when metadata is loaded
    audio.addEventListener('loadedmetadata', () => {
        totalDurationDisplay.textContent = formatTime(audio.duration);
    });
}

// Function to format time in mm:ss
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Update progress bar and current time as the audio plays
audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progressPercent;
        currentTimeDisplay.textContent = formatTime(audio.currentTime);
    }
});

// Seek functionality: allow users to click or drag on the progress bar
progressBar.addEventListener('input', () => {
    if (audio.duration) {
        const seekTime = (progressBar.value / 100) * audio.duration;
        audio.currentTime = seekTime;
    }
});

// Function to play or pause the track
function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        // Update play button icon to pause
        playButton.querySelector('i').classList.remove("fa-play");
        playButton.querySelector('i').classList.add("fa-pause");
    } else {
        audio.pause();
        // Update play button icon to play
        playButton.querySelector('i').classList.add("fa-play");
        playButton.querySelector('i').classList.remove("fa-pause");
    }
}

// Event listener for play button
playButton.addEventListener('click', togglePlayPause);

// Function to play the next track
function playNextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    audio.play();
    // Update play button icon to pause
    playButton.querySelector('i').classList.remove("fa-play");
    playButton.querySelector('i').classList.add("fa-pause");
}

// Function to play the previous track
function playPreviousTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    audio.play();
    // Update play button icon to pause
    playButton.querySelector('i').classList.remove("fa-play");
    playButton.querySelector('i').classList.add("fa-pause");
}

// Event listeners for next and previous buttons
nextButton.addEventListener('click', playNextTrack);
previousButton.addEventListener('click', playPreviousTrack);

// Update play/pause button when the track ends
audio.addEventListener('ended', () => {
    playNextTrack();
});

// Initialize the player with the first track
loadTrack(currentTrackIndex);
