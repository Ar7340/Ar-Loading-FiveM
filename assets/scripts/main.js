// Enhanced date display
function updateDate() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    document.getElementById('date').textContent = now.toLocaleDateString('en-US', options);
}

// Enhanced cursor movement
document.addEventListener('mousemove', function(e) {
    const cursor = document.getElementById('cursor');
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Loading animation
let progress = 0;
const progressElement = document.querySelector('.progress');
const descriptionElement = document.querySelector('.loader .description');
const filledLogo = document.querySelector('.filled-logo');

const loadingMessages = [
    'Initializing server...',
    'Loading assets...',
    'Connecting to database...',
    'Preparing experience...',
    'Almost ready...',
    'Welcome to Ar7340!'
];

function updateProgress() {
    if (progress < 100) {
        progress += Math.random() * 3;
        if (progress > 100) progress = 100;
        
        progressElement.textContent = Math.floor(progress) + '%';
        filledLogo.style.height = progress + '%';
        
        const messageIndex = Math.floor((progress / 100) * (loadingMessages.length - 1));
        descriptionElement.textContent = loadingMessages[messageIndex];
        
        setTimeout(updateProgress, 100 + Math.random() * 200);
    }
}

// Initialize
updateDate();
setInterval(updateDate, 1000);
setTimeout(() => updateProgress(), 1000);

// Copy to clipboard function with visual feedback
async function copyToClipboard(text, element) {
    try {
        await navigator.clipboard.writeText(text);
        
        // Add visual feedback
        element.classList.add('copied');
        
        // Create a more prominent glow effect
        element.style.transform = 'translateY(-0.3vw) scale(1.1)';
        element.style.boxShadow = '0 15px 40px rgba(147, 51, 234, 0.8), 0 0 30px rgba(168, 85, 247, 0.6)';
        element.style.background = 'linear-gradient(145deg, rgba(147, 51, 234, 0.6), rgba(168, 85, 247, 0.5))';
        
        // Reset after animation
        setTimeout(() => {
            element.classList.remove('copied');
            element.style.transform = '';
            element.style.boxShadow = '';
            element.style.background = '';
        }, 2000);
        
        console.log('Successfully copied to clipboard:', text);
    } catch (err) {
        console.error('Failed to copy to clipboard:', err);
        
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            console.log('Fallback copy successful');
            
            // Visual feedback for fallback
            element.classList.add('copied');
            setTimeout(() => element.classList.remove('copied'), 2000);
        } catch (fallbackErr) {
            console.error('Fallback copy failed:', fallbackErr);
        }
        
        document.body.removeChild(textArea);
    }
}

// Add social media icons with copy functionality and links
const socialContainer = document.querySelector('.categories .socialmedia');
const socialIcons = [
    { 
        icon: 'fab fa-discord', 
        title: 'Discord', 
        color: '#a855f7',
        link: 'https://discord.gg/Ar7340' // Replace with your actual Discord invite
    },
    { 
        icon: 'fab fa-youtube', 
        title: 'YouTube', 
        color: '#c084fc',
        link: 'https://youtube.com/@Ar7340' // Replace with your actual YouTube channel
    },
    { 
        icon: 'fab fa-twitter', 
        title: 'Twitter', 
        color: '#8b5cf6',
        link: 'https://twitter.com/Ar7340' // Replace with your actual Twitter
    },
    { 
        icon: 'fab fa-instagram', 
        title: 'Instagram', 
        color: '#7c3aed',
        link: 'https://instagram.com/Ar7340' // Replace with your actual Instagram
    }
];

if (socialContainer) {
    socialIcons.forEach(social => {
        const box = document.createElement('div');
        box.className = 'box';
        box.innerHTML = `<i class="${social.icon} icon" title="${social.title}" style="color: ${social.color}"></i>`;
        
        // Add click event with copy functionality
        box.addEventListener('click', function(e) {
            e.preventDefault();
            copyToClipboard(social.link, this);
        });
        
        // Enhanced hover effects
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-0.2vw) scale(1.05)';
            this.style.boxShadow = `0 10px 30px ${social.color}66`;
        });
        
        box.addEventListener('mouseleave', function() {
            if (!this.classList.contains('copied')) {
                this.style.transform = '';
                this.style.boxShadow = '';
            }
        });
        
        socialContainer.appendChild(box);
    });
}

// Enhanced purple theme effects
document.addEventListener('DOMContentLoaded', function() {
    // Add purple glow effect to interactive elements
    const interactiveElements = document.querySelectorAll('.box, .bind, .progress');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 20px rgba(168, 85, 247, 0.6)';
        });
        element.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
    
    // Add purple particle effect on logo hover
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.filter = 'drop-shadow(0 0 25px #a855f7) drop-shadow(0 0 50px #c084fc)';
        });
        logo.addEventListener('mouseleave', function() {
            this.style.filter = '';
        });
    }

    // Initialize music controls
    initializeMusicControls();
});

// Fixed Music Controls Functionality
function initializeMusicControls() {
    const music = document.getElementById('music');
    const youtubePlayer = document.getElementById('youtube-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const volumeSlider = document.getElementById('volume-slider');
    const volumePercent = document.getElementById('volume-percent');
    const musicIcon = document.querySelector('.music-icon');
    const musicTitle = document.getElementById('music-title');

    // Check if we have the music element or YouTube player
    const audioSource = music || youtubePlayer;
    
    if (!audioSource) {
        console.log('No audio source found');
        return;
    }

    // Set default volume
    let currentVolume = 0.1; // 10%
    let isPlaying = false;
    let isMuted = false;

    // Initialize volume display
    if (volumePercent) {
        volumePercent.textContent = '10%';
    }

    // Initialize volume slider background
    if (volumeSlider) {
        const initialValue = 10;
        volumeSlider.value = initialValue;
        volumeSlider.style.background = `linear-gradient(to right, #a855f7 0%, #c084fc ${initialValue}%, rgba(147, 51, 234, 0.3) ${initialValue}%, rgba(147, 51, 234, 0.3) 100%)`;
    }

    // Handle audio element
    if (music) {
        music.volume = currentVolume;
        music.muted = false;
        
        // Remove autoplay attribute to prevent issues
        music.removeAttribute('autoplay');
        
        // Add event listeners for audio element
        music.addEventListener('loadeddata', function() {
            console.log('Audio loaded successfully');
        });
        
        music.addEventListener('error', function(e) {
            console.error('Audio error:', e);
            if (musicTitle) {
                musicTitle.textContent = 'Audio unavailable';
                musicTitle.style.color = '#ef4444';
            }
        });

        music.addEventListener('play', function() {
            isPlaying = true;
            updatePlayPauseButton();
            if (musicIcon) musicIcon.style.animationPlayState = 'running';
        });

        music.addEventListener('pause', function() {
            isPlaying = false;
            updatePlayPauseButton();
            if (musicIcon) musicIcon.style.animationPlayState = 'paused';
        });
    }

    // Handle YouTube player (if using YouTube as audio source)
    if (youtubePlayer && !music) {
        // YouTube player volume control (limited functionality due to cross-origin restrictions)
        console.log('YouTube player detected - limited audio controls available');
    }

    // Play/Pause functionality
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', function(e) {
            e.preventDefault();
            togglePlayPause();
        });
    }

    function togglePlayPause() {
        if (music) {
            if (isPlaying) {
                music.pause();
            } else {
                const playPromise = music.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        console.log('Audio playing successfully');
                        if (musicTitle) {
                            musicTitle.textContent = 'Background Music';
                            musicTitle.style.color = '#ddd6fe';
                        }
                    }).catch(error => {
                        console.error('Play failed:', error);
                        if (musicTitle) {
                            musicTitle.textContent = 'Click to enable audio';
                            musicTitle.style.color = '#fbbf24';
                        }
                    });
                }
            }
        }
    }

    function updatePlayPauseButton() {
        if (playPauseBtn) {
            if (isPlaying) {
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        }
    }

    // Volume control functionality
    if (volumeSlider && music) {
        volumeSlider.addEventListener('input', function(e) {
            const volume = parseInt(this.value);
            currentVolume = volume / 100;
            
            // Update audio volume
            music.volume = currentVolume;
            
            // Update volume percentage display
            if (volumePercent) {
                volumePercent.textContent = volume + '%';
            }
            
            // Update volume icon
            updateVolumeIcon(currentVolume);
            
            // Update slider background
            this.style.background = `linear-gradient(to right, #a855f7 0%, #c084fc ${volume}%, rgba(147, 51, 234, 0.3) ${volume}%, rgba(147, 51, 234, 0.3) 100%)`;
            
            // Handle mute state
            if (volume === 0) {
                isMuted = true;
                music.muted = true;
            } else {
                isMuted = false;
                music.muted = false;
            }
        });

        // Add visual feedback on slider interaction
        volumeSlider.addEventListener('mousedown', function() {
            this.style.transform = 'scale(1.05)';
        });

        volumeSlider.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });

        volumeSlider.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    function updateVolumeIcon(volume) {
        const volumeIcon = document.querySelector('.volume-control i');
        if (volumeIcon) {
            if (volume === 0 || isMuted) {
                volumeIcon.className = 'fas fa-volume-mute';
            } else if (volume < 0.3) {
                volumeIcon.className = 'fas fa-volume-down';
            } else if (volume < 0.7) {
                volumeIcon.className = 'fas fa-volume-up';
            } else {
                volumeIcon.className = 'fas fa-volume-up';
            }
        }
    }

    // Click on volume icon to toggle mute
    const volumeIcon = document.querySelector('.volume-control i');
    if (volumeIcon && music) {
        volumeIcon.addEventListener('click', function() {
            if (isMuted) {
                // Unmute
                music.muted = false;
                music.volume = currentVolume;
                isMuted = false;
                if (volumeSlider) volumeSlider.value = currentVolume * 100;
                if (volumePercent) volumePercent.textContent = Math.round(currentVolume * 100) + '%';
            } else {
                // Mute
                music.muted = true;
                isMuted = true;
                if (volumeSlider) volumeSlider.value = 0;
                if (volumePercent) volumePercent.textContent = '0%';
            }
            updateVolumeIcon(isMuted ? 0 : currentVolume);
            
            // Update slider background
            const sliderValue = isMuted ? 0 : currentVolume * 100;
            if (volumeSlider) {
                volumeSlider.style.background = `linear-gradient(to right, #a855f7 0%, #c084fc ${sliderValue}%, rgba(147, 51, 234, 0.3) ${sliderValue}%, rgba(147, 51, 234, 0.3) 100%)`;
            }
        });
        
        // Add hover effect to volume icon
        volumeIcon.style.cursor = 'pointer';
        volumeIcon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.color = '#a855f7';
        });
        volumeIcon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.color = '#c084fc';
        });
    }

    // Auto-play handling with user interaction
    if (music) {
        // Wait for user interaction before attempting to play
        const enableAudioOnInteraction = function() {
            const playPromise = music.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log('Auto-play successful after user interaction');
                    if (musicTitle) {
                        musicTitle.textContent = 'Background Music';
                        musicTitle.style.color = '#ddd6fe';
                    }
                    // Remove the event listeners since audio is now enabled
                    document.removeEventListener('click', enableAudioOnInteraction);
                    document.removeEventListener('keydown', enableAudioOnInteraction);
                }).catch(error => {
                    console.log('Auto-play still blocked:', error);
                });
            }
        };

        // Set initial state
        if (musicTitle) {
            musicTitle.textContent = 'Click anywhere to enable audio';
            musicTitle.style.color = '#fbbf24';
        }

        // Add event listeners for user interaction
        document.addEventListener('click', enableAudioOnInteraction);
        document.addEventListener('keydown', enableAudioOnInteraction);

        // Try to play immediately (will fail if autoplay is blocked, but that's okay)
        const initialPlayPromise = music.play();
        if (initialPlayPromise !== undefined) {
            initialPlayPromise.then(() => {
                console.log('Initial autoplay successful');
                if (musicTitle) {
                    musicTitle.textContent = 'Background Music';
                    musicTitle.style.color = '#ddd6fe';
                }
                document.removeEventListener('click', enableAudioOnInteraction);
                document.removeEventListener('keydown', enableAudioOnInteraction);
            }).catch(error => {
                console.log('Initial autoplay blocked (this is normal):', error);
            });
        }
    }

    // Initialize button state
    updatePlayPauseButton();
    updateVolumeIcon(currentVolume);
}