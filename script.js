document.addEventListener('DOMContentLoaded', () => {
    const videoPlayer1 = document.getElementById('videoPlayer1');
    const videoPlayer2 = document.getElementById('videoPlayer2');

    const videoInput1 = document.getElementById('videoInput1');
    const videoInput2 = document.getElementById('videoInput2');

    const playPauseButton = document.getElementById('playPauseButton');
    const rewindButton = document.getElementById('rewindButton');
    const forwardButton = document.getElementById('forwardButton');
    const fiveMinBackButton = document.getElementById('fiveMinBackButton');
    const fiveMinForwardButton = document.getElementById('fiveMinForwardButton');

    let isPlaying = false;

    // Event listeners for file inputs
    videoInput1.addEventListener('change', handleFileSelect(videoPlayer1));
    videoInput2.addEventListener('change', handleFileSelect(videoPlayer2));

    function handleFileSelect(videoPlayer) {
        return function(event) {
            const file = event.target.files[0];
            if (file) {
                const url = URL.createObjectURL(file);
                videoPlayer.src = url;
            }
        }
    }

    // Play/Pause button
    playPauseButton.addEventListener('click', () => {
        if (isPlaying) {
            videoPlayer1.pause();
            videoPlayer2.pause();
            playPauseButton.querySelector('img').src = 'icons/play.png';
        } else {
            videoPlayer1.play();
            videoPlayer2.play();
            playPauseButton.querySelector('img').src = 'icons/pause.png'; // Changed to pause icon
        }
        isPlaying = !isPlaying;
    });

    // Rewind button
    rewindButton.addEventListener('click', () => {
        const currentTime1 = videoPlayer1.currentTime;
        const currentTime2 = videoPlayer2.currentTime;
        videoPlayer1.currentTime = Math.max(0, currentTime1 - 15);
        videoPlayer2.currentTime = Math.max(0, currentTime2 - 15);
    });

    // Forward button
    forwardButton.addEventListener('click', () => {
        const duration1 = videoPlayer1.duration;
        const currentTime1 = videoPlayer1.currentTime;
        videoPlayer1.currentTime = Math.min(duration1, currentTime1 + 15);
        
        const duration2 = videoPlayer2.duration;
        const currentTime2 = videoPlayer2.currentTime;
        videoPlayer2.currentTime = Math.min(duration2, currentTime2 + 15);
    });

    // 5 Min Back button
    fiveMinBackButton.addEventListener('click', () => {
        const currentTime1 = videoPlayer1.currentTime;
        const currentTime2 = videoPlayer2.currentTime;
        videoPlayer1.currentTime = Math.max(0, currentTime1 - 300);
        videoPlayer2.currentTime = Math.max(0, currentTime2 - 300);
    });

    // 5 Min Forward button
    fiveMinForwardButton.addEventListener('click', () => {
        const duration1 = videoPlayer1.duration;
        const currentTime1 = videoPlayer1.currentTime;
        videoPlayer1.currentTime = Math.min(duration1, currentTime1 + 300);
        
        const duration2 = videoPlayer2.duration;
        const currentTime2 = videoPlayer2.currentTime;
        videoPlayer2.currentTime = Math.min(duration2, currentTime2 + 300);
    });

    // Resizing functionality
    const resizableElements = document.querySelectorAll('.resizable');

    resizableElements.forEach(element => {
        const handle = element.querySelector('.resize-handle');
        let isResizing = false;
        let isProportional = true; // Start with proportional resizing
        let startX, startY, startWidth, startHeight;

        handle.addEventListener('mousedown', (e) => {
            isResizing = true;
            isProportional = e.shiftKey; // Check if Shift key is held down
            startX = e.clientX;
            startY = e.clientY;
            startWidth = parseInt(document.defaultView.getComputedStyle(element).width, 10);
            startHeight = parseInt(document.defaultView.getComputedStyle(element).height, 10);
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        });

        function handleMouseMove(e) {
            if (isResizing) {
                let width = startWidth + (e.clientX - startX);
                let height = startHeight + (e.clientY - startY);

                if (isProportional) {
                    // Maintain 16:9 aspect ratio
                    height = width / (16 / 9);
                }

                element.style.width = `${width}px`;
                element.style.height = `${height}px`;
                element.querySelector('video').style.width = '100%'; // Adjust video width
                element.querySelector('video').style.height = '100%'; // Adjust video height
            }
        }

        function handleMouseUp() {
            isResizing = false;
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }
    });
});
