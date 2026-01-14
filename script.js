document.addEventListener('DOMContentLoaded', () => {
    const intro = document.querySelector('.intro-overlay');
    
    // Fade out after 2.5 seconds (allowing for text animation to be read)
    setTimeout(() => {
        intro.classList.add('fade-out');
        
        // Remove from DOM after fade transition is complete
        setTimeout(() => {
            intro.style.display = 'none';
        }, 1000); // Matches the CSS transition duration
    }, 2500); 
});
