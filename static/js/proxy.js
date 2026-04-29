// Proxy Manager using Ultraviolet
class ProxyManager {
    constructor() {
        this.view = document.getElementById('proxy-view');
        this.iframe = document.getElementById('proxy-iframe');
        this.loading = document.getElementById('loading-screen');
        this.urlInput = document.getElementById('proxy-url');
        
        this.init();
    }

    init() {
        // UV is loaded from the UV script tags
        this.registerServiceWorker();

        // Events
        document.getElementById('proxy-home').addEventListener('click', () => {
            this.hide();
        });

        document.getElementById('proxy-refresh').addEventListener('click', () => {
            this.iframe.contentWindow.location.reload();
        });
    }

    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                await navigator.serviceWorker.register('/uv/sw.js', {
                    scope: '/uv/service/'
                });
                console.log('UV Service Worker registered');
            } catch (err) {
                console.error('Failed to register SW:', err);
            }
        }
    }

    loadURL(url) {
        this.show();
        this.loading.classList.remove('hidden');

        // Encode URL for UV
        const encoded = __uv$config.encodeUrl(url);
        const proxyUrl = `${__uv$config.prefix}${encoded}`;

        this.urlInput.value = url;
        
        // Small delay to show loading animation
        setTimeout(() => {
            this.iframe.src = proxyUrl;
        }, 500);

        // Hide loading when iframe loads
        this.iframe.onload = () => {
            this.loading.classList.add('hidden');
        };
    }

    show() {
        this.view.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    hide() {
        this.view.classList.add('hidden');
        this.iframe.src = 'about:blank';
        document.body.style.overflow = '';
    }
}

// Initialize
window.proxyManager = new ProxyManager();
