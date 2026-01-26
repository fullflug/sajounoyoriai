document.addEventListener('DOMContentLoaded', () => {
    const intro = document.querySelector('.intro-overlay');

    // Intro Fade out logic
    setTimeout(() => {
        intro.classList.add('fade-out');
        setTimeout(() => {
            intro.style.display = 'none';
        }, 1000);
    }, 1500);

    // BGM Auto-play logic
    const bgm = document.getElementById("bgm");
    if (bgm) {
        bgm.volume = 0.3;
        bgm.play().catch(() => {
            // Fallback for blocked auto-play
            document.addEventListener("click", () => {
                bgm.play();
            }, { once: true });
        });
    }

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
    // Auto-play on first scroll
    // Auto-play on first interaction (scroll, click, touch, key)
    const handleInteractionPlay = () => {
        if (audio.paused) {
            audio.play().then(() => {
                playBtn.textContent = '⏸';
                console.log('Auto-playing music on interaction');
                // Only remove listeners if play succeeded
                window.removeEventListener('scroll', handleInteractionPlay);
                window.removeEventListener('click', handleInteractionPlay);
                window.removeEventListener('touchstart', handleInteractionPlay);
                window.removeEventListener('keydown', handleInteractionPlay);
            }).catch(e => {
                console.log('Auto-play failed (likely blocked), waiting for next interaction:', e);
                // Do NOT remove listeners here, try again next time
            });
        }
    };

    window.addEventListener('scroll', handleInteractionPlay);
    window.addEventListener('click', handleInteractionPlay);
    window.addEventListener('touchstart', handleInteractionPlay);
    window.addEventListener('keydown', handleInteractionPlay);
});
