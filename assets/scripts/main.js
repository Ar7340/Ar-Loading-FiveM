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

// Enhanced date display
function updateDate() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false
    });
    document.getElementById('current-time').textContent = timeString;
}

// Loading animation
let progress = 50;
const progressElement = document.getElementById('progress-text');
const descriptionElement = document.getElementById('progress-description');
const progressBarFill = document.getElementById('progress-bar-fill');

const loadingMessages = [
    'Welcome to Nirvana!'
];

function updateProgress() {
    if (progress < 100) {
        progress += Math.random() * 0.5;
        if (progress > 100) progress = 100;
        
        const displayProgress = Math.floor(progress);
        progressElement.textContent = displayProgress + '%';
        progressBarFill.style.width = progress + '%';
        
        const messageIndex = Math.floor((progress / 100) * (loadingMessages.length - 1));
        descriptionElement.textContent = loadingMessages[messageIndex];
        
        setTimeout(updateProgress, 200 + Math.random() * 300);
    } else {
        // When loading is complete, show success message
        descriptionElement.textContent = 'Ready to play!';
        progressElement.style.color = '#10b981';
        
        // Hide loader after 2 seconds
        setTimeout(() => {
            document.querySelector('.loader').style.opacity = '0';
            document.querySelector('.loader').style.transform = 'translateY(20px)';
        }, 2000);
    }
}

// Copy to clipboard function with visual feedback
async function copyToClipboard(text, element) {
    try {
        await navigator.clipboard.writeText(text);
        
        // Add visual feedback
        element.style.transform = 'translateY(-0.3vw) scale(1.1)';
        element.style.boxShadow = '0 15px 40px rgba(147, 51, 234, 0.8), 0 0 30px rgba(168, 85, 247, 0.6)';
        element.style.background = 'linear-gradient(145deg, rgba(147, 51, 234, 0.6), rgba(168, 85, 247, 0.5))';
        
        // Show tooltip
        const tooltip = document.createElement('div');
        tooltip.textContent = 'Copied!';
        tooltip.style.cssText = `
            position: absolute;
            top: -40px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(30, 20, 50, 0.95);
            color: #ddd6fe;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 500;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        `;
        
        element.style.position = 'relative';
        element.appendChild(tooltip);
        
        // Animate tooltip in
        setTimeout(() => {
            tooltip.style.opacity = '1';
        }, 50);
        
        // Reset after 1.5 seconds
        setTimeout(() => {
            tooltip.style.opacity = '0';
            element.style.transform = '';
            element.style.boxShadow = '';
            element.style.background = '';
            
            setTimeout(() => {
                if (tooltip.parentNode) {
                    tooltip.parentNode.removeChild(tooltip);
                }
            }, 300);
        }, 1500);
        
    } catch (err) {
        console.error('Failed to copy to clipboard:', err);
        
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
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
    let currentVolume = 0.4; // 40%
    let isPlaying = false;
    let isMuted = false;

    // Initialize volume display
    if (volumePercent) {
        volumePercent.textContent = '40%';
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

// FiveM Server Status Function
async function updateServerStatus() {
    const clientsElement = document.getElementById('clients');
    const serverIP = Config.ServerIP || "localhost:30120"; // Use config or fallback
    
    try {
        // FiveM server info endpoint
        const response = await fetch(`http://${serverIP}/info.json`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const serverInfo = await response.json();
        
        // Extract player count and max players
        const currentPlayers = serverInfo.clients || 0;
        const maxPlayers = serverInfo.sv_maxclients || 32;
        
        // Update the display
        if (clientsElement) {
            clientsElement.textContent = `${currentPlayers}/${maxPlayers}`;
            
            // Add color coding based on server population
            const percentage = (currentPlayers / maxPlayers) * 100;
            if (percentage >= 90) {
                clientsElement.style.color = '#ef4444'; // Red for nearly full
            } else if (percentage >= 70) {
                clientsElement.style.color = '#f59e0b'; // Orange for high
            } else if (percentage >= 40) {
                clientsElement.style.color = '#10b981'; // Green for medium
            } else {
                clientsElement.style.color = '#c084fc'; // Purple for low
            }
        }
        
        console.log(`Server Status: ${currentPlayers}/${maxPlayers} players online`);
        
    } catch (error) {
        console.error('Failed to fetch server status:', error);
        
        // Fallback display when server is unreachable
        if (clientsElement) {
            clientsElement.textContent = 'Offline';
            clientsElement.style.color = '#6b7280'; // Gray for offline
        }
    }
}

// Alternative method using players.json endpoint
async function updateServerStatusAlternative() {
    const clientsElement = document.getElementById('clients');
    const serverIP = Config.ServerIP || "localhost:30120";
    
    try {
        // Get players list and server info separately
        const [playersResponse, infoResponse] = await Promise.all([
            fetch(`http://${serverIP}/players.json`),
            fetch(`http://${serverIP}/info.json`)
        ]);
        
        if (!playersResponse.ok || !infoResponse.ok) {
            throw new Error('Failed to fetch server data');
        }
        
        const players = await playersResponse.json();
        const serverInfo = await infoResponse.json();
        
        const currentPlayers = players.length;
        const maxPlayers = serverInfo.sv_maxclients || 32;
        
        if (clientsElement) {
            clientsElement.textContent = `${currentPlayers}/${maxPlayers}`;
            
            // Color coding
            const percentage = (currentPlayers / maxPlayers) * 100;
            if (percentage >= 90) {
                clientsElement.style.color = '#ef4444';
            } else if (percentage >= 70) {
                clientsElement.style.color = '#f59e0b';
            } else if (percentage >= 40) {
                clientsElement.style.color = '#10b981';
            } else {
                clientsElement.style.color = '#c084fc';
            }
        }
        
    } catch (error) {
        console.error('Failed to fetch server status (alternative method):', error);
        if (clientsElement) {
            clientsElement.textContent = 'Offline';
            clientsElement.style.color = '#6b7280';
        }
    }
}

// Add CORS proxy support for external servers
async function updateServerStatusWithProxy() {
    const clientsElement = document.getElementById('clients');
    const serverIP = Config.ServerIP || "localhost:30120";
    
    try {
        // Using a CORS proxy for external requests (if needed)
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(`http://${serverIP}/info.json`)}`;
        const response = await fetch(proxyUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const serverInfo = JSON.parse(data.contents);
        
        const currentPlayers = serverInfo.clients || 0;
        const maxPlayers = serverInfo.sv_maxclients || 32;
        
        if (clientsElement) {
            clientsElement.textContent = `${currentPlayers}/${maxPlayers}`;
            
            const percentage = (currentPlayers / maxPlayers) * 100;
            if (percentage >= 90) {
                clientsElement.style.color = '#ef4444';
            } else if (percentage >= 70) {
                clientsElement.style.color = '#f59e0b';
            } else if (percentage >= 40) {
                clientsElement.style.color = '#10b981';
            } else {
                clientsElement.style.color = '#c084fc';
            }
        }
        
    } catch (error) {
        console.error('Failed to fetch server status with proxy:', error);
        if (clientsElement) {
            clientsElement.textContent = 'Offline';
            clientsElement.style.color = '#6b7280';
        }
    }
}

// Initialize server status checking
function initializeServerStatus() {
    // Update immediately
    updateServerStatus();
    
    // Update every 30 seconds
    setInterval(updateServerStatus, 30000);
    
    // Also update when page becomes visible again
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            updateServerStatus();
        }
    });
}

// Integration with existing main.js
// Add this to your existing updateDate function call area:

// Initialize
updateDate();
setInterval(updateDate, 1000);
setTimeout(() => updateProgress(), 1000);

// Initialize server status (ADD THIS LINE)
initializeServerStatus();

const video = document.getElementById('local-player');
video.play();
