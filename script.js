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
});
