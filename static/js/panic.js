// Panic Button - Press key to instantly switch to safe page
class PanicManager {
    constructor() {
        this.key = localStorage.getItem('panicKey') || '`';
        this.url = localStorage.getItem('panicUrl') || 'https://www.google.com/search?q=calculator';
        this.active = false;
        
        this.init();
    }

    init() {
        this.updateUI();

        document.addEventListener('keydown', (e) => {
            if (e.key === this.key && !this.active) {
                this.activate();
            } else if (e.key === this.key && this.active) {
                this.deactivate();
            }
        });

        // Sync input with storage
        const keyInput = document.getElementById('panic-key');
        const urlInput = document.getElementById('panic-url');
        
        if (keyInput) keyInput.value = this.key;
        if (urlInput) urlInput.value = this.url;
    }

    updateSettings(key, url) {
        this.key = key || '`';
        this.url = url || 'https://www.google.com/search?q=calculator';
    }

    activate() {
        const panicScreen = document.getElementById('panic-screen');
        const iframe = panicScreen.querySelector('iframe');
        
        iframe.src = this.url;
        panicScreen.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        this.active = true;

        // Attempt to change tab title/icon to look educational
        document.title = 'Calculator - Google Search';
        
        // Request fullscreen for maximum cover
        try {
            panicScreen.requestFullscreen();
        } catch (e) {
            // Ignore fullscreen errors
        }
    }

    deactivate() {
        const panicScreen = document.getElementById('panic-screen');
        const iframe = panicScreen.querySelector('iframe');
        
        panicScreen.classList.add('hidden');
        iframe.src = 'about:blank';
        document.body.style.overflow = '';
        
        this.active = false;

        // Restore original title
        window.settingsManager?.loadSettings();
        
        // Exit fullscreen
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    }

    updateUI() {
        // Ensure panic screen exists
        if (!document.getElementById('panic-screen')) {
            const screen = document.createElement('div');
            screen.id = 'panic-screen';
            screen.className = 'panic-screen hidden';
            screen.innerHTML = '<iframe frameborder="0"></iframe>';
            document.body.appendChild(screen);
        }
    }
}

// Initialize
window.panicManager = new PanicManager();
