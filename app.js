// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Video functionality
const video1 = document.getElementById('projectVideo1');
const video2 = document.getElementById('projectVideo2');
const video3 = document.getElementById('projectVideo3');
    const hoverSign = document.querySelector('.hover-sign');
    
    const videoList = [video1, video2, video3];
    
    videoList.forEach(function(video) {
        if (video) {
            video.addEventListener("mouseover", function() {
                video.play();
                if (hoverSign) hoverSign.classList.add("active");
            });
            video.addEventListener("mouseout", function() {
                video.pause();
                if (hoverSign) hoverSign.classList.remove("active");
            });
        }
    });

    // Sidebar functionality
const sideBar = document.querySelector('.sidebar');
const menu = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');

    if (menu && sideBar) {
        menu.addEventListener("click", function() {
            sideBar.classList.remove("close-sidebar");
            sideBar.classList.add("open-sidebar");
        });
    }

    if (closeIcon && sideBar) {
        closeIcon.addEventListener("click", function() {
            sideBar.classList.remove("open-sidebar");
            sideBar.classList.add("close-sidebar");
        });
    }

    // Smooth scroll functionality
    function smoothScrollTo(targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = 70; // Account for fixed header
            const elementPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    }

    // Contact button functionality - More comprehensive approach
    function setupContactButtons() {
        // Get all buttons that might be contact buttons
        const allButtons = document.querySelectorAll('button');
        
        allButtons.forEach(button => {
            const buttonText = button.textContent.toLowerCase().trim();
            
            // Check if it's a contact button
            if (buttonText.includes('contact') || 
                buttonText.includes('send message') || 
                buttonText.includes('work with us') ||
                button.classList.contains('contact-btn')) {
                
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    console.log('Contact button clicked!'); // Debug log
                    smoothScrollTo('#contact-section');
                });
            }
        });
    }

    // Navigation links functionality
    function setupNavigation() {
        const navLinks = document.querySelectorAll('header ul a, .sidebar ul a');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const linkText = this.textContent.toLowerCase().trim();
                
                console.log('Navigation clicked:', linkText); // Debug log
                
                switch(linkText) {
                    case 'about':
                        smoothScrollTo('#about-section');
                        break;
                    case 'skills':
                        smoothScrollTo('#skills-section');
                        break;
                    case 'projects':
                        smoothScrollTo('#projects-section');
                        break;
                    case 'home':
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        break;
                    default:
                        // If no specific case, try to scroll to contact
                        if (linkText.includes('contact')) {
                            smoothScrollTo('#contact-section');
                        }
                }
                
                // Close sidebar if open
                if (sideBar && sideBar.classList.contains('open-sidebar')) {
    sideBar.classList.remove("open-sidebar");
    sideBar.classList.add("close-sidebar");
                }
            });
        });
    }

    // Scroll indicator functionality
    function setupScrollIndicator() {
        const scrollDown = document.querySelector('.scroll-down');
        if (scrollDown) {
            scrollDown.addEventListener('click', function() {
                smoothScrollTo('#about-section');
            });
        }
    }

    // Scroll progress bar functionality
    function setupScrollProgress() {
        const scrollProgress = document.querySelector('.scroll-progress');
        if (scrollProgress) {
            window.addEventListener('scroll', function() {
                const scrollTop = window.pageYOffset;
                const docHeight = document.body.scrollHeight - window.innerHeight;
                const scrollPercent = (scrollTop / docHeight) * 100;
                scrollProgress.style.width = scrollPercent + '%';
            });
        }
    }

    // Music player functionality
    function setupMusicPlayer() {
        const musicToggle = document.getElementById('musicToggle');
        const musicIcon = document.getElementById('musicIcon');
        const backgroundMusic = document.getElementById('backgroundMusic');
        
        if (musicToggle && musicIcon && backgroundMusic) {
            let isPlaying = false;
            let musicLoaded = false;
            
            // Set initial volume
            backgroundMusic.volume = 0.6;
            
            // Load the audio file
            backgroundMusic.load();
            
            // Check if audio is loaded
            backgroundMusic.addEventListener('canplaythrough', function() {
                musicLoaded = true;
                console.log('Music file loaded successfully');
            });
            
            // Handle loading errors
            backgroundMusic.addEventListener('error', function(e) {
                console.log('Music loading error:', e);
                console.log('Trying alternative paths...');
                
                // Try different paths
                const paths = [
                    'Music/MzStudio.mp3',
                    './Music/MzStudio.mp3',
                    'MzStudio.mp3',
                    './MzStudio.mp3'
                ];
                
                let currentPath = 0;
                tryNextPath();
                
                function tryNextPath() {
                    if (currentPath < paths.length) {
                        backgroundMusic.src = paths[currentPath];
                        backgroundMusic.load();
                        currentPath++;
                        console.log('Trying path:', paths[currentPath - 1]);
                    } else {
                        console.log('All music paths failed');
                        musicToggle.style.opacity = '0.5';
                        musicToggle.title = 'Music file not found';
                    }
                }
            });
            
            // Click handler for music toggle
            musicToggle.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Music button clicked');
                
                if (isPlaying) {
                    // Pause music
                    backgroundMusic.pause();
                    musicIcon.className = 'bx bx-play';
                    musicToggle.classList.remove('playing');
                    isPlaying = false;
                    console.log('Music paused');
                } else {
                    // Play music
                    if (musicLoaded) {
                        const playPromise = backgroundMusic.play();
                        
                        if (playPromise !== undefined) {
                            playPromise.then(() => {
                                musicIcon.className = 'bx bx-pause';
                                musicIcon.style.display = 'block';
                                musicToggle.classList.add('playing');
                                isPlaying = true;
                                console.log('Music playing successfully');
                            }).catch(error => {
                                console.log('Playback failed:', error);
                                alert('Please allow audio playback in your browser settings.');
                            });
                        }
                    } else {
                        console.log('Music not loaded yet, trying to load...');
                        backgroundMusic.load();
                        setTimeout(() => {
                            if (musicLoaded) {
                                backgroundMusic.play().then(() => {
                                    musicIcon.className = 'bx bx-pause';
                                    musicIcon.style.display = 'block';
                                    musicToggle.classList.add('playing');
                                    isPlaying = true;
                                    console.log('Music playing after load');
                                });
                            }
                        }, 1000);
                    }
                }
            });
            
            // Auto-play after page load (with delay)
            setTimeout(() => {
                if (!isPlaying && musicLoaded) {
                    backgroundMusic.play().then(() => {
                        musicIcon.className = 'bx bx-pause';
                        musicIcon.style.display = 'block';
                        musicToggle.classList.add('playing');
                        isPlaying = true;
                        console.log('Music auto-started');
                    }).catch(error => {
                        console.log('Auto-play blocked:', error);
                        console.log('User will need to click to start music');
                    });
                }
            }, 2000);
            
            // Handle audio events
            backgroundMusic.addEventListener('ended', function() {
                musicIcon.className = 'bx bx-play';
                musicToggle.classList.remove('playing');
                isPlaying = false;
                console.log('Music ended');
            });
            
            backgroundMusic.addEventListener('play', function() {
                musicIcon.className = 'bx bx-pause';
                musicIcon.style.display = 'block';
                musicToggle.classList.add('playing');
                isPlaying = true;
                console.log('Music started playing');
            });
            
            backgroundMusic.addEventListener('pause', function() {
                musicIcon.className = 'bx bx-play';
                musicToggle.classList.remove('playing');
                isPlaying = false;
                console.log('Music paused');
            });
            
            // Show/hide play icon on hover
            musicIcon.style.display = 'none';
            
            musicToggle.addEventListener('mouseenter', function() {
                musicIcon.style.display = 'block';
            });
            
            musicToggle.addEventListener('mouseleave', function() {
                if (!isPlaying) {
                    musicIcon.style.display = 'none';
                }
            });
            
            console.log('Music player initialized with path: Music/MzStudio.mp3');
        } else {
            console.log('Music player elements not found');
        }
    }

    // Initialize all functionality
    setupContactButtons();
    setupNavigation();
    setupScrollIndicator();
    setupScrollProgress();
    setupMusicPlayer();

    // Add click handlers to any buttons that might be missed
    setTimeout(function() {
        setupContactButtons();
    }, 1000);

    console.log('All navigation, contact functionality, and music player initialized!');
    console.log('Make sure MzStudio.mp3 file is in the same directory as index.html');
});