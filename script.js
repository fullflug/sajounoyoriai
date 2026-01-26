document.addEventListener('DOMContentLoaded', () => {
    const intro = document.querySelector('.intro-overlay');

    // Fade out after 1.5 seconds
    setTimeout(() => {
        intro.classList.add('fade-out');

        // Remove from DOM after fade transition is complete
        setTimeout(() => {
            intro.style.display = 'none';
        }, 1000);
    }, 1500);

    // Music player functionality
    const audio = document.getElementById('bgMusic');
    const playBtn = document.getElementById('playBtn');
    const progressBar = document.getElementById('progressBar');
    const progressContainer = document.querySelector('.player-progress');
    const playerTime = document.getElementById('playerTime');

    // Format time in mm:ss
    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // Update time display
    audio.addEventListener('timeupdate', () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = progress + '%';
        playerTime.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
    });

    // Play/Pause toggle
    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playBtn.textContent = '⏸';
        } else {
            audio.pause();
            playBtn.textContent = '▶';
        }
    });

    // Progress bar click to seek
    progressContainer.addEventListener('click', (e) => {
        const rect = progressContainer.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audio.currentTime = percent * audio.duration;
    });

    // Reset button when audio ends
    audio.addEventListener('ended', () => {
        playBtn.textContent = '▶';
    });
});
