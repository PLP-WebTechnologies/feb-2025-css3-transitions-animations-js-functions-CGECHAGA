
        document.addEventListener('DOMContentLoaded', function() {
            // DOM Elements
            const animationTarget = document.getElementById('animationTarget');
            const toggleBtn = document.getElementById('toggleAnimation');
            const changeColorBtn = document.getElementById('changeColor');
            const showPrefsBtn = document.getElementById('showPreferences');
            const prefsForm = document.getElementById('preferenceForm');
            const savePrefsBtn = document.getElementById('savePreferences');
            const bgColorInput = document.getElementById('bgColor');
            const animationSpeedSelect = document.getElementById('animationSpeed');

            // Load saved preferences
            loadPreferences();

            // Event Listeners
            toggleBtn.addEventListener('click', toggleAnimation);
            changeColorBtn.addEventListener('click', changeBackgroundColor);
            showPrefsBtn.addEventListener('click', togglePreferencesForm);
            savePrefsBtn.addEventListener('click', savePreferences);
            animationTarget.addEventListener('click', function() {
                this.classList.toggle('active');
                // Save animation state
                localStorage.setItem('animationActive', this.classList.contains('active'));
            });

            // Check if animation was active when page was last closed
            if (localStorage.getItem('animationActive') === 'true') {
                animationTarget.classList.add('active');
            }

            // Functions
            function toggleAnimation() {
                animationTarget.classList.toggle('active');
                
                // Pulse effect on button
                toggleBtn.style.animation = 'pulse 0.5s';
                setTimeout(() => {
                    toggleBtn.style.animation = '';
                }, 500);
                
                // Save animation state
                localStorage.setItem('animationActive', animationTarget.classList.contains('active'));
            }

            function changeBackgroundColor() {
                const colors = ['#f5f5f5', '#e8f4f8', '#f8e8e8', '#e8f8ed', '#f8f2e8'];
                const currentColor = document.body.style.backgroundColor || getComputedStyle(document.body).backgroundColor;
                let newColor;
                
                do {
                    newColor = colors[Math.floor(Math.random() * colors.length)];
                } while (newColor === currentColor);
                
                document.body.style.backgroundColor = newColor;
                
                // Save color preference
                localStorage.setItem('bgColor', newColor);
                
                // Animate button
                changeColorBtn.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    changeColorBtn.style.transform = '';
                }, 300);
            }

            function togglePreferencesForm() {
                if (prefsForm.classList.contains('hidden')) {
                    prefsForm.classList.remove('hidden');
                    prefsForm.style.display = 'block';
                    prefsForm.style.animation = 'slideUp 0.6s ease forwards';
                } else {
                    prefsForm.style.animation = 'fadeOut 0.5s ease forwards';
                    setTimeout(() => {
                        prefsForm.classList.add('hidden');
                    }, 500);
                }
            }

            function savePreferences() {
                const bgColor = bgColorInput.value;
                const animationSpeed = animationSpeedSelect.value;
                
                // Save to localStorage
                localStorage.setItem('bgColor', bgColor);
                localStorage.setItem('animationSpeed', animationSpeed);
                
                // Apply preferences
                document.body.style.backgroundColor = bgColor;
                applyAnimationSpeed(animationSpeed);
                
                // Show confirmation animation
                savePrefsBtn.textContent = 'Saved!';
                savePrefsBtn.style.backgroundColor = '#4CAF50';
                setTimeout(() => {
                    savePrefsBtn.textContent = 'Save Preferences';
                    savePrefsBtn.style.backgroundColor = '#4a6fa5';
                }, 1500);
                
                // Close preferences form
                setTimeout(togglePreferencesForm, 1000);
            }

            function loadPreferences() {
                // Background color
                const savedColor = localStorage.getItem('bgColor');
                if (savedColor) {
                    document.body.style.backgroundColor = savedColor;
                    bgColorInput.value = savedColor;
                }
                
                // Animation speed
                const savedSpeed = localStorage.getItem('animationSpeed') || 'normal';
                animationSpeedSelect.value = savedSpeed;
                applyAnimationSpeed(savedSpeed);
            }

            function applyAnimationSpeed(speed) {
                let duration;
                switch(speed) {
                    case 'slow': duration = '2s'; break;
                    case 'fast': duration = '0.5s'; break;
                    default: duration = '1s';
                }
                
                // Update CSS variables or specific elements
                document.documentElement.style.setProperty('--animation-duration', duration);
                
                // Update specific animations
                const animatedElements = document.querySelectorAll('.animated-box, h1, .preference-form');
                animatedElements.forEach(el => {
                    if (el.classList.contains('active')) {
                        el.style.animationDuration = duration;
                    }
                });
            }
        });
    