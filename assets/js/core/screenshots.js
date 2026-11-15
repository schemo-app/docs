document.addEventListener('click', event => {
    const link = event.target.closest('.schemo-screenshot a');

    if (!link || !window.mediumZoom || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
        return;
    }

    event.preventDefault();

    // Keyboard activation targets the link; Medium Zoom listens for image clicks.
    if (event.target === link) {
        link.querySelector('img').click();
    }
});
